'use strict';

const Tonal = require('tonal');
const chordNames = Tonal.Chord.names();
const utils = require('./utils');

/**
 * Derive a chord from the given string. Exposed as simply `chord` in Scribbletune
 * @param  {String} str [example: CMaj]
 * @return {Array}     [example output: ['c4', 'e4', 'g4']]
 */
const getChord = str => {
	if (typeof str !== 'string' || utils.isNote(str)) {
		return;
	}
	// Since chords like C6 can also qualify for the note C6, 
	// Scribbletune treats such chords with the `th` appended to it
	const numericalChords = {
		'4th': '4',
		'5th': '5',
		'7th': '7',
		'9th': '9',
		'11th': '11',
		'13th': '13',
	};
	let arr;
	let spl = str.split('-');
	spl[0].replace(/([a-gA-G][#|b]?)(.+)/, (match, root, chordName) => {
		if (numericalChords[chordName]) {
			chordName = numericalChords[chordName];
		}
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
const chords = () => {
	// Since chords like C6 can also qualify for the note C6, 
	// Scribbletune treats such chords with the `th` appended to it
	const numericalChords = {
		'4': '4th',
		'5': '5th',
		'7': '7th',
		'9': '9th',
		'11': '11th',
		'13': '13th'
	};
	return chordNames.map(c => {
		if (/^\d+$/.test(c) && numericalChords[c]) {
			return numericalChords[c];
		} else {
			return c;
		}
	})
};

module.exports = {getChord, chords};
