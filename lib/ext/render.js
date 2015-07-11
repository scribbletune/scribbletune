'use strict';
/**
 * Scribbletune: Render an array of notes to a midi file
 * -----------------------------------------------------
 */

var fs = require('fs'),
	jsmidgen = require('jsmidgen');

module.exports = function(Scribbletune) {
	var writeToFile = function(notes, fileName) {
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
			if (noteObj.note !== '') {
				track
					// addNote(track, noteObj with octave, ticks/interval/noteLength)
					// noteOn = function(channel, pitch, time, velocity)
					// .addNote(0, noteObj.note, noteObj.length);
					.noteOn(0, noteObj.note, null, level)
					.noteOff(0, noteObj.note, noteObj.length, level);
			} else {
				track
					.noteOff(0, noteObj.note, noteObj.length);
			}
		});

		fs.writeFileSync(fileName, file.toBytes(), 'binary');
	};

	Scribbletune.render = writeToFile;
};
