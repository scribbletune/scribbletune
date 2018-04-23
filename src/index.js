'use strict';
const Tonal = require('tonal');
const chord = require('./chord');
const clip = require('./clip');
const midi = require('./midi');
const loop = require('./loop');
const session = require('./session');
const transport = require('./transport');

// Allow scale to be denoted by mode as well
module.exports = {
	scale: Tonal.Scale.notes,
	mode: Tonal.Scale.notes,
	scales: Tonal.Scale.names(),
	modes: Tonal.Scale.names(),
	chord: chord.getChord,
	chords: chord.chords,
	clip,
	midi,
	session,
	loop,
	transport
};
