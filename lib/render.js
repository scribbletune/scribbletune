'use strict';
/**
 * Scribbletune: Render an array of notes to a midi file
 * -----------------------------------------------------
 */

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.render = undefined;

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _jsmidgen = require('jsmidgen');

var jsmidgen = _interopRequireWildcard(_jsmidgen);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var render = function render(notes) {
	var fileName = arguments.length <= 1 || arguments[1] === undefined ? 'music.mid' : arguments[1];

	if (notes === undefined || typeof notes === 'string') {
		throw new Error('You must provide an array of notes to write!');
	}

	var file = new jsmidgen.File();
	var track = new jsmidgen.Track();
	file.addTrack(track);

	notes.map(function (noteObj) {
		var level = noteObj.level || 127;
		// While writing chords (multiple notes per tick)
		// only the first noteOn (or noteOff) needs the complete arity of the function call
		// subsequent calls need only the first 2 args (channel and note)
		if (noteObj.note) {
			noteObj.note.forEach(function (n, idx) {
				if (idx === 0) {
					track.noteOn(0, n, null, level); // channel, pitch(note), length, velocity
				} else {
						track.noteOn(0, n); // channel, pitch(note)
					}
			});
			noteObj.note.forEach(function (n, idx) {
				if (idx === 0) {
					track.noteOff(0, n, noteObj.length, level);
				} else {
					track.noteOff(0, n);
				}
			});
		} else {
			track.noteOff(0, '', noteObj.length);
		}
	});

	fs.writeFileSync(fileName, file.toBytes(), 'binary');
};

exports.render = render;