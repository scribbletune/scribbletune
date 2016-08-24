'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var fs = require('fs');
var assert = require('assert');
var jsmidgen = require('jsmidgen');

var render = function render(notes) {
	var fileName = arguments.length <= 1 || arguments[1] === undefined ? 'music.mid' : arguments[1];

	assert(notes !== undefined && typeof notes !== 'string', 'You must provide an array of notes to write!');

	var file = new jsmidgen.File();
	var track = new jsmidgen.Track();
	file.addTrack(track);

	notes.forEach(function (noteObj) {
		var level = noteObj.level || 127;
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

	fs.writeFileSync(fileName, file.toBytes(), 'binary');
};

exports.default = render;