'use strict';

const mode = require('./mode');

const chordPtn = /^([a-gA-G][#|b]?)(maj|min|dim7|dim|dom7|maj7|min7|sus2|sus4|aug|sixth)\-?([0-8])?/;

const chordModeMap = {
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

const isChord = function(str) {
	return str.match(chordPtn);
}

const getChord = function(str) {
	let arr = [];
	
	str.replace(chordPtn, (match, root, scale, octave) => {
		octave = octave || 4;
		let m = mode(root.toLowerCase(), chordModeMap[scale].mode, octave);
		chordModeMap[scale].int.forEach(i => {
			arr.push(m[i]);
		});
	});

	return arr;
}

module.exports = {isChord, getChord, chords: Object.keys(chordModeMap)};
