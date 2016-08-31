const assert = require('assert');
const modes = require('./modes');
const chromaticNotes = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];

const mode = (root = 'c', mode = 'ionian', octave = 3) => {
	// Append octave to chromatic notes
	let chromatic =
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
	assert(root.match(/[abcdefg]#?/i), 'Invalid root note: ' + root);

	// Make sure if the provided mode is valid
	assert(modes.hasOwnProperty(mode), 'Invalid mode: ' + mode);

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

module.exports = mode;
