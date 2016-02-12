'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _modes = require('./modes');

var getModes = _interopRequireWildcard(_modes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var modes = getModes();
var chromaticNotes = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];

exports.default = function (root, mode, octave) {
	root = root && root.toLowerCase() || 'c';
	mode = mode && mode.toLowerCase() || 'ionian';

	octave = octave || 3;

	// Append octave to chromatic notes
	var chromatic = chromaticNotes.map(function (el, idx) {
		return el + octave;
	})
	// Double up with the next octave to be able to bleed over
	.concat(chromaticNotes.map(function (el, idx) {
		return el + (octave + 1);
	}));

	// Make sure the root is valid [abcdefg] optionally followed by #
	if (!root.match(/[abcdefg]#?/)) {
		throw new Error('Invalid root note!');
	}

	// Make sure if the provided mode is valid
	if (!modes.hasOwnProperty(mode)) {
		throw new Error('Invalid mode!');
	}

	/**
  * Slice the chromatic notes from the root note onward &
  * filter it by mode pattern to return the correct notes
  */
	return chromatic.slice(chromatic.indexOf(root + octave)).filter(function (el, idx) {
		return modes[mode][idx] === 1;
	});
};