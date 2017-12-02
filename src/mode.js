'use strict';

const assert = require('assert');
const modes = require('./modes');
const transpose = require('./transpose');
const chromaticNotes = ['c', 'db', 'd', 'eb', 'e', 'f', 'gb', 'g', 'ab', 'a', 'bb', 'b'];
const accidentals = {
	'c#': 'db',
	'd#': 'eb',
	'f#': 'gb',
	'g#': 'ab',
	'a#': 'bb'
};

/**
 * Get mode or scale for the provided root note and octave
 * @param  {String}  root                  Root note
 * @param  {String}  mode                  Name of the mode or scale
 * @param  {Number}  octave
 * @param  {Boolean} addRootFromNextOctave Append the root note in the next octave before returning the mode/scale
 * @return {[type]}                        Returns the mode as an array, e.g. ['c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3', 'c4']
 */
const mode = (root, mode, octave, addRootFromNextOctave) => {
	if (root.match(/\s/) && !mode && !octave && !addRootFromNextOctave) {
		let args = root.split(/\s/);
		root = args.shift();
		let lastItem = args.pop();

		// Check if the last item is a true/false value for addRootFromNextOctave
		if (lastItem === 'true' || lastItem === 'false') {
			addRootFromNextOctave = lastItem !== 'false';
			lastItem = args.pop();	// lastItem should now be the octave
		}

		// Check if the last item is a number specified for the octave
		if (Number.isInteger(+lastItem)) {
			octave = +lastItem;
			// Since it was an octave, nullify last time
			// so that in case it was not a number then it can be assumed to be a mode/scale
			lastItem = null;
		}

		// Since we extracted the root, octave and addRootFromNextOctave,
		// what's left should be part (or whole) name of a mode, push it back into the args
		if (lastItem) {
			args.push(lastItem);
		}

		// Combine whatever is left behind and assume it as the mode or scale name
		mode = args.join(' ');
	}

	// Make sure the root is valid [abcdefg] optionally followed by #
	assert(root.match(/[abcdefg]#?/i), 'Invalid root note: ' + root);

	// Make sure if the provided mode is valid
	assert(modes.hasOwnProperty(mode), 'Invalid mode: ' + mode);

	root = root || 'c';
	if (root.indexOf('#') > 0) {
		root = accidentals[root];
	}
	mode = mode || 'ionian';
	octave = +octave || transpose.defaultMiddleC;

  	// Transpose octave into correct octave determined by middle C
	addRootFromNextOctave = addRootFromNextOctave !== false;

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