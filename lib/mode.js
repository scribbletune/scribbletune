'use strict';

var modes = require('./modes')();
var chromaticNotes = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];

function getMode(root, mode, octave) {
	var chromatic;

	root = root && root.toLowerCase() || 'c';
	mode = mode && mode.toLowerCase() || 'ionian';

	octave = octave || 3;

	// Append octave to chromatic notes
	chromatic =
		chromaticNotes
			.map(function(el, idx) {
				return el + octave;
			})
			// Double up with the next octave to be able to bleed over
			.concat(
				chromaticNotes
					.map(function(el, idx) {
						return el + (octave + 1);
					})
			);

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
	return chromatic
		.slice(chromatic.indexOf(root + octave))
		.filter(function(el, idx) {
			return modes[mode][idx] === 1;
		});

}

module.exports = getMode;
