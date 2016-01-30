'use strict';
/**
 * Scribbletune: Render an array of notes to a midi file
 * -----------------------------------------------------
 */

var fs = require('fs');
var jsmidgen = require('jsmidgen');

function render(notes, fileName) {
	if (notes === undefined || typeof notes === 'string') {
		throw new Error('You must provide an array of notes to write!');
	}

	var file, track;

	fileName = fileName || 'music.mid';
	file = new jsmidgen.File();
	track = new jsmidgen.Track();
	file.addTrack(track);

	notes.map(function(noteObj, idx) {
		var level = noteObj.level || 127;
		// While writing chords (multiple notes per tick)
		// only the first noteOn (or noteOff) needs the complete arity of the function call
		// subsequent calls need only the first 2 args (channel and note)
		var doneWithFirstNote;
		if (noteObj.note) {
			doneWithFirstNote = false;
			noteObj.note.map(function(n) {
				if (!doneWithFirstNote) {
					track.noteOn(0, n, null, level) // channel, pitch(note), length, velocity
					doneWithFirstNote = true;
				} else {
					track.noteOn(0, n) // channel, pitch(note), length, velocity
				}
			});

			doneWithFirstNote = false;
			noteObj.note.map(function(n) {
				if (!doneWithFirstNote) {
					track.noteOff(0, n, noteObj.length, level)
					doneWithFirstNote = true;
				} else {
					track.noteOff(0, n)
				}
			});
		} else {
			track
				.noteOff(0, '', noteObj.length);
		}
	});

	fs.writeFileSync(fileName, file.toBytes(), 'binary');
}

module.exports = render;
