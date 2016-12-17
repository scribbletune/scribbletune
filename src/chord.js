'use strict';

const mode = require('./mode');

const chordPtn = /^([a-gA-G][#|b]?)(maj|Maj|min|m|Min|dim7|Dim7|dim|Dim|dom7|Dom7|7|maj7|Maj7|min7|Min7|sus2|Sus2|sus4|Sus4|aug|Aug|sixth|Sixth)\-?([0-8])?/;

const modeMap = {
	// c e g
	maj: {
		mode: 'ionian',
		int: [0, 2, 4]
	},

	// c d# g
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

	// c d# g a#
	min7: {
		mode: 'minor',
		int: [0, 2, 4, 6]
	},

	// c e g a#
	dom7: {
		mode: 'mixolydian',
		int: [0, 2, 4, 6]
	},

	// c d# f#
	dim: {
		mode: 'diminished whole half',
		int: [0, 2, 4]
	},

	// c d# f# a
	dim7: {
		mode: 'diminished whole half',
		int: [0, 2, 4, 6]
	},

	// c e g#
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

modeMap.Maj = modeMap.maj;
modeMap.Min = modeMap.m = modeMap.min;
modeMap.Dim = modeMap.dim;
modeMap.Dim7 = modeMap.dim7;
modeMap.Maj7 = modeMap.maj7;
modeMap.Min7 = modeMap.min7;
modeMap.Dom7 = modeMap[7] = modeMap.dom7;
modeMap.Sus2 = modeMap.sus2;
modeMap.Sus4 = modeMap.sus4;
modeMap.Aug = modeMap.aug;
modeMap.Sixth = modeMap[6] = modeMap['6th'] = modeMap.sixth;

const isChord = function(str) {
	return str.match(chordPtn);
}

const getChord = function(str) {
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

module.exports = {isChord, getChord, chords: Object.keys(modeMap)};
