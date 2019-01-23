'use strict';

const fs = require('fs');
const assert = require('assert');
const jsmidgen = require('jsmidgen');

/**
 * Take an array of note objects to asynchronously generate a MIDI file in the same location as this method is called
 * @param  {Array} notes    Notes are in the format: {note: ['c3'], level: 127, length: 64}
 * @param  {String} fileName If a filename is not provided, then `music.mid` is used by default
 * If `null` is passed for `fileName` bytes are returned instead of creating a file
 *
 * @param  {Object} callback Receives a callback method. Current signature for method is `err` in first param,
 * in case something goes wrong.
 * In case `fileName` is null, it will return a `err, bytes` signature for the function
 *
 */
const midi = (notes, fileName, callback) => {
	if (!callback || typeof callback !== 'function') {
		throw new TypeError('Invalid callback');
	}

	const file = createFileFromNotes(notes)
	const returnBytes = fileName === null;
	fileName = fileName || 'music.mid';
	const bytes = file.toBytes();

	if (returnBytes) {
		// If filename is passed as null, then return the bytes in callback
		callback(null, bytes);
		return;
	}

	fs.writeFile(fileName, bytes, 'binary', callback);
}

function createFileFromNotes(notes) {
	assert(Array.isArray(notes), 'You must provide an array of notes to write!');
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
			track.noteOff(0, '', noteObj.length);
		}
	});

	return file;
}

module.exports = midi;
