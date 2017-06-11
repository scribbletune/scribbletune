'use strict';

const mode = require('./mode');

// Regex for identifying chords
const chordPtn = /^([a-gA-G][#|b]?)(dim7|Dim7|dim|Dim|dom7|Dom7|7th|maj7|Maj7|min7|Min7|m7|maj|Maj|min|m|Min|sus2|Sus2|sus4|Sus4|aug|Aug|sixth|Sixth|6th)\-?([0-8])?/;

/**
 * Scales and integer notation to derive chords
 * @type {Object}
 */
const modeMap = {
	// c e g
	maj: {
		mode: 'ionian',
		int: [0, 2, 4]
	},

	// c e♭ g
	min: {
		mode: 'aeolian',
		int: [0, 2, 4]
	},

	// c d g
	sus2: {
		mode: 'major',
		int: [0, 1, 4]
	},

	// c f g
	sus4: {
		mode: 'major',
		int: [0, 3, 4]
	},

	// c e g b
	maj7: {
		mode: 'major',
		int: [0, 2, 4, 6]
	},

	// c e♭ g b♭
	min7: {
		mode: 'minor',
		int: [0, 2, 4, 6]
	},

	// c e g b♭
	dom7: {
		mode: 'mixolydian',
		int: [0, 2, 4, 6]
	},

	// c e♭ g♭
	dim: {
		mode: 'diminished whole half',
		int: [0, 2, 4]
	},

	// c e♭ g♭ b𝄫
	dim7: {
		mode: 'diminished whole half',
		int: [0, 2, 4, 6]
	},

	// c e g♯
	aug: {
		mode: 'fifth mode',
		int: [0, 2, 5]
	},

	// c e g a
	sixth: {
		mode: 'major',
		int: [0, 2, 4, 5]
	}
};

// Alternate names for chords
modeMap.Maj = modeMap.maj;
modeMap.Min = modeMap.m = modeMap.min;
modeMap.Dim = modeMap.dim;
modeMap.Dim7 = modeMap.dim7;
modeMap.Maj7 = modeMap.maj7;
modeMap.Min7 = modeMap.min7;
modeMap.m7 = modeMap.min7;
modeMap.Dom7 = modeMap['7th'] = modeMap.dom7;
modeMap.Sus2 = modeMap.sus2;
modeMap.Sus4 = modeMap.sus4;
modeMap.Aug = modeMap.aug;
modeMap.Sixth = modeMap['6th'] = modeMap.sixth;

/**
 * Use the chord regex to identify if the passed string is a chord
 * @param  {String}  str [examples: CMaj Cmaj cmaj Cm cmin f#maj7 etc]
 * @return {Boolean}
 */
const isChord = str => str.match(chordPtn);

/**
 * Derive a chord from the given string. Exposed as simply `chord` in Scribbletune
 * @param  {String} str [example: CMaj]
 * @return {Array}     [example output: ['c4', 'e4', 'g4']]
 */
const getChord = str => {
	let arr = [];
	
	str.replace(chordPtn, (match, root, scale, octave) => {
		octave = octave || 4;
		let m = mode(root.toLowerCase(), modeMap[scale].mode, octave);
		modeMap[scale].int.forEach(i => {
			arr.push(m[i]);
		});
	});

	return arr;
}

/**
 * Get a list of chords available in Scribbletune.
 * @return {Array}     [example output: ['maj', 'min', 'dim']]
 */
const listChords = () => Object.keys(modeMap);

module.exports = {isChord, getChord, listChords};
