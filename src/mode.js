'use strict';

const assert = require('assert');
const modes = require('./modes');
const chromaticNotes = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];

/**
 * Get mode or scale for the provided root note and octave
 * @param  {String}  root                  Root note
 * @param  {String}  mode                  Name of the mode or scale
 * @param  {Number}  octave
 * @param  {Boolean} addRootFromNextOctave Append the root note in the next octave before returning the mode/scale
 * @return {[type]}                        Returns the mode as an array, e.g. ['c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3', 'c4']
 */
const mode = (root, mode, octave, addRootFromNextOctave) => {
	root = root || 'c';
	mode = mode || 'ionian';
	octave = octave ? Number(octave) : 3;
	addRootFromNextOctave = addRootFromNextOctave === false ? false : true;
	// Make sure the root is valid [abcdefg] optionally followed by #
	assert(root.match(/[abcdefg]#?/i), 'Invalid root note: ' + root);

	// Make sure if the provided mode is valid
	assert(modes.hasOwnProperty(mode), 'Invalid mode: ' + mode);

	// Append octave to chromatic notes
	let chromatic =
		chromaticNotes
			.map(note => note + octave)
			// Double up with the next octave to be able to bleed over
			.concat(
				chromaticNotes.map(note => note + (octave + 1))
			);

	/**
	 * Slice the chromatic notes from the root note onward &
	 * filter it by mode pattern to return the correct notes
	 */
	let modeArr = chromatic
		.slice(chromatic.indexOf(root + octave))
		.filter((note, idx) => modes[mode][idx] === 1);

	// Add root from the next octave before returning (default)
	if (addRootFromNextOctave) {
		modeArr.push(root + (octave + 1));
	}

	return modeArr;
}

module.exports = mode;
