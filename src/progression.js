'use strict';
const Tonal = require('tonal');

const degrees = {
	'I': { idx: 0, name: 'M' },
	'II': { idx: 1, name: 'M' },
	'III': { idx: 2, name: 'M' },
	'IV': { idx: 3, name: 'M' },
	'V': { idx: 4, name: 'M' },
	'VI': { idx: 5, name: 'M' },
	'VII': { idx: 6, name: 'M' },

	'i': { idx: 0, name: 'm' },
	'ii': { idx: 1, name: 'm' },
	'iii': { idx: 2, name: 'm' },
	'iv': { idx: 3, name: 'm' },
	'v': { idx: 4, name: 'm' },
	'vi': { idx: 5, name: 'm' },
	'vii': { idx: 6, name: 'm' },

	'I7': { idx: 0, name: 'Maj7' },
	'II7': { idx: 1, name: 'Maj7' },
	'III7': { idx: 2, name: 'Maj7' },
	'IV7': { idx: 3, name: 'Maj7' },
	'V7': { idx: 4, name: 'Maj7' },
	'VI7': { idx: 5, name: 'Maj7' },
	'VII7': { idx: 6, name: 'Maj7' },

	'i7': { idx: 0, name: 'm7' },
	'ii7': { idx: 1, name: 'm7' },
	'iii7': { idx: 2, name: 'm7' },
	'iv7': { idx: 3, name: 'm7' },
	'v7': { idx: 4, name: 'm7' },
	'vi7': { idx: 5, name: 'm7' },
	'vii7': { idx: 6, name: 'm7' },
};

const progression = (noteOctaveScale, chords) => {
	// Set the octave if missing
	const noteOctaveScaleArr = noteOctaveScale.split(' ');
	if (!noteOctaveScaleArr[0].match(/\d/)) {
		noteOctaveScaleArr[0] += '4';
		noteOctaveScale = noteOctaveScaleArr.join(' ');
	}

	// Get the scale from the given note and scale/mode combination
	const mode = Tonal.Scale.notes(noteOctaveScale);
	const chordsArr = chords.replace(/\s*,+\s*/g, ' ').split(' ');
	const chordFamily = chordsArr.map((el, idx) => {
		// get the degree
		const degree = degrees[el];
		// get the note itself
		const note = mode[degrees[el].idx];
		// get the octave of the note
		const oct = note.replace(/\D+/, ''); 
		// now get the chord
		return note.replace(/\d/, '') + degree.name + '-' + oct;
	});

	return chordFamily.toString().replace(/,/g, ' ');
};

module.exports = progression;