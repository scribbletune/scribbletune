'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _modes = require('./modes');

var _modes2 = _interopRequireDefault(_modes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = require('assert');

var chromaticNotes = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];

var mode = function mode() {
	var root = arguments.length <= 0 || arguments[0] === undefined ? 'c' : arguments[0];
	var mode = arguments.length <= 1 || arguments[1] === undefined ? 'ionian' : arguments[1];
	var octave = arguments.length <= 2 || arguments[2] === undefined ? 3 : arguments[2];

	// Append octave to chromatic notes
	var chromatic = chromaticNotes.map(function (el, idx) {
		return el + octave;
	})
	// Double up with the next octave to be able to bleed over
	.concat(chromaticNotes.map(function (el, idx) {
		return el + (octave + 1);
	}));

	// Make sure the root is valid [abcdefg] optionally followed by #
	assert(root.match(/[abcdefg]#?/), 'Invalid root note: ' + root);

	// Make sure if the provided mode is valid
	assert(_modes2.default.hasOwnProperty(mode), 'Invalid mode: ' + mode);

	/**
  * Slice the chromatic notes from the root note onward &
  * filter it by mode pattern to return the correct notes
  */
	return chromatic.slice(chromatic.indexOf(root + octave)).filter(function (el, idx) {
		return _modes2.default[mode][idx] === 1;
	});
};

exports.default = mode;