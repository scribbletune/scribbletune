'use strict';

const Tonal = require('tonal');
const chordNames = Tonal.chord.names();
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

	// Since chords like C5 can also qualify for the note C5, 
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
	// separate the octave from the chord
	const spl = str.split('-'); // e.g. CMaj7-4 => ['CMaj7', '4'];
	// tonal doesnt recognize 5 and below in the `tokenize` method,
	// hence explicitly massage those out
	const tokenizedName = Tonal.Chord.tokenize(spl[0]); // e.g. ['C', 'Maj7']
	let root = tokenizedName[0];
	let chordName = tokenizedName[1];
	
	if (root[1] === '4' || root[1] === '5') {
		chordName = root[1];
		root = root.replace(/\d/, '');
	}

	if (numericalChords[chordName]) {
		chordName = numericalChords[chordName];
	}

	if (!Tonal.Chord.exists(chordName)) {
		throw new TypeError('Invalid chord name: ' + chordName);
	}

	return Tonal.chord(chordName).map((el) => {
		let note = Tonal.transpose(root + (spl[1] || 4))(el);
		return Tonal.Note.simplify(note);
	});
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
