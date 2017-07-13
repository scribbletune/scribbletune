'use strict';

const fs = require('fs');
const assert = require('assert');
const jsmidgen = require('jsmidgen');
var transposition = 0;
/**
 * Takes an integer and transposes all notes to a different middle C octave.
 * @param {Integer} octaveIndex		The new octave for middle C.
 */
function setMiddle(octaveIndex){
	transposition = octaveIndex;
}
/**
 * Take an array of note objects to generate a MIDI file in the same location as this method is called
 * @param  {Array} notes    Notes are in the format: {note: 'c3', level: 127, length: 64}
 * @param  {String} fileName If a filename is not provided, then `music.mid` is used by default
 */
const midi = (notes, fileName) => {
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
			var note = noteObj.note[0];
			//Get the octave identifier (2 for a2, 5 for e5)
			var oct = parseInt(note.slice(1,note.length));
			//Parse the octave into an integer
			oct+=transposition;
			//Transpose the octave
			noteObj.note = note[0]+oct.toString();
			console.log(note);
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

	fs.writeFileSync(fileName, file.toBytes(), 'binary');
}

module.exports = {midi, setMiddle};
