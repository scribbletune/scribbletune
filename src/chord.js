'use strict';

const Tonal = require('tonal');
const chordNames = Tonal.Chord.names();

/**
 * Use the chord regex to identify if the passed string is a chord
 * @param  {String}  str [examples: CMaj Cmaj cmaj Cm cmin f#maj7 etc]
 * @return {Boolean}
 */
const isChord = str => {
	let c;
	let spl = str.split('-');
	spl[0].replace(/([a-gA-G][#|b]?)(.+)/, (match, root, chordName) => {
		c = chordNames[chordName];
	});

	return !!c;
}

/**
 * Derive a chord from the given string. Exposed as simply `chord` in Scribbletune
 * @param  {String} str [example: CMaj]
 * @return {Array}     [example output: ['c4', 'e4', 'g4']]
 */
const getChord = str => {
	let arr;
	let spl = str.split('-');
	spl[0].replace(/([a-gA-G][#|b]?)(.+)/, (match, root, chordName) => {
		if (chordNames.indexOf(chordName) > -1) {
			arr = Tonal.chord(chordName).map(Tonal.transpose(root + (spl[1] || 4)));
		}
	});

	return arr;
}

/**
 * Get a list of chords available in Scribbletune.
 * @return {Array}     [example output: ['maj', 'min', 'dim']]
 */
const chords = () => chordNames;

module.exports = {isChord, getChord, chords};
