'use strict';

const Tonal = require('tonal');

/**
 * Get mode or scale for the provided root note and octave using Tonal
 * Ideally Tonal should be used directly instead of this method
 * This method is provided only for backward compatibility
 * @param  {String}  root                  Root note
 * @param  {String}  mode                  Name of the mode or scale
 * @param  {Number}  octave
 * @return {[type]}                        Returns the mode as an array, e.g. ['c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3']
 */
const mode = (root, mode, octave) => {
	if (root.match(/\s/) && !mode && !octave) {
		let args = root.split(/\s/);
		root = args.shift();
		let lastItem = args.pop();

		// Check if the last item is a number specified for the octave
		if (Number.isInteger(+lastItem)) {
			octave = +lastItem;
			// Since it was an octave, nullify last time
			// so that in case it was not a number then it can be assumed to be a mode/scale
			lastItem = null;
		}

		// Since we extracted the root & octave
		// what's left should be part (or whole) name of a mode, push it back into the args
		if (lastItem) {
			args.push(lastItem);
		}

		// Combine whatever is left behind and assume it as the mode or scale name
		mode = args.join(' ');
	}

	root = root || 'C';
	mode = mode || 'ionian';
	octave = +octave || 4;

	return Tonal.Scale.notes(root + octave + ' ' + mode);
}

module.exports.mode = mode;
module.exports.names = Tonal.scale.names();
