'use strict';
const Tonal = require('tonal');
const chord = require('./chord');
const clip = require('./clip');
const clip2 = require('./clip2');
const midi = require('./midi');
const session = typeof window !== 'undefined' && require('./session');
const transport = typeof window !== 'undefined' && require('./transport');

// Allow scale to be denoted by mode as well
module.exports = {
	scale: Tonal.Scale.notes,
	mode: Tonal.Scale.notes,
	scales: Tonal.Scale.names(),
	modes: Tonal.Scale.names(),
	chord: chord.getChord,
	chords: chord.chords,
	clip,
	clip2,
	midi,
	session,
	transport
};
