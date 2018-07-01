'use strict';
const Tonal = require('tonal');
const chord = require('./chord');

// Allow scale to be denoted by mode as well
module.exports = {
	scale: Tonal.Scale.notes,
	mode: Tonal.Scale.notes,
	scales: Tonal.Scale.names,
	modes: Tonal.Scale.names,
	chord: chord.getChord,
	chords: chord.chords,
	clip: require('./clip'),
	midi: require('./midi'),
	loop: typeof window !== 'undefined' && require('./loop'),
	session: typeof window !== 'undefined' && require('./session'),
	transport: typeof window !== 'undefined' && require('./transport')
};
