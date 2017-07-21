'use strict';

const fs = require('fs');
const assert = require('assert');
const jsmidgen = require('jsmidgen');
const btoa = require('btoa');
/**
 * Take an array of note objects to return a Base64 MIDI string
 * @param  {Array} notes    Notes are in the format: {note: 'c3', level: 127, length: 64}
 * @param  {String} fileName If a filename is not provided, then `music.mid` is used by default
 */
const toBase64String = (notes, fileName) => {
	assert(notes !== undefined && typeof notes !== 'string', 'You must provide an array of notes to write!');
	fileName = fileName || 'music.mid';
	
	let file = new jsmidgen.File();
	let track = new jsmidgen.Track();
	file.addTrack(track);

	notes.forEach((noteObj) => {
		let level = noteObj.level || 127;
		// While writing chords (multiple notes per tick)
		// only the first noteOn (or noteOff) needs the complete arity of the function call
		// subsequent calls need only the first 2 args (channel and note)
		if (noteObj.note) {
			if (typeof noteObj.note === 'string') {
				track.noteOn(0, noteObj.note, noteObj.length, level); // channel, pitch(note), length, velocity
				track.noteOff(0, noteObj.note, noteObj.length, level);
			} else {
				track.addChord(0, noteObj.note, noteObj.length, level);
			}
		} else {
			track
				.noteOff(0, '', noteObj.length);
		}
	});
	console.log(file.toBytes());
	return 'data:audio/mid;base64,' + btoa(file.toBytes());
}

module.exports = {toBase64String: toBase64String};
