'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');
const assert = require('assert');
const jsmidgen = require('jsmidgen');
var path = require('path');
var workingDir = path.dirname(require.main.filename)
/**
 * Take an array of note objects to generate a MIDI file in the same location as this method is called
 * @param  {Array} notes    Notes are in the format: {note: ['c3'], level: 127, length: 64}
 * @param  {String} fileName If a filename is not provided, then `music.mid` is used by default
 * @param  {String} bpm If a filename is not provided, then `music.mid` is used by default
 */
const midi = (notes, fileName, bpm) => {
	assert(notes !== undefined && typeof notes !== 'string', 'You must provide an array of notes to write!');
	fileName = fileName || 'music.mid';
	let file = new jsmidgen.File();
	let track = new jsmidgen.Track();
	
	if (bpm !==undefined) {
		track.setTempo(bpm);
	}
	
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

	writeFile('/Output/' + fileName, file.toBytes(), 'binary');
}


function writeFile(filepath, contents, cb) {
  mkdirp(workingDir+path.dirname(filepath), function (err) {
    if (err) return cb(err);

    fs.writeFileSync(workingDir+path, contents, cb);
  });
}


module.exports = midi;
