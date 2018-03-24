'use strict';
const Tonal = require('tonal');
const chord = require('./chord');
const clip = require('./clip');
const midi = require('./midi');

// Allow scale to be denoted by mode as well
module.exports = {
	scale: Tonal.Scale.notes,
	scales: Tonal.Scale.names(),
	chord: chord.getChord,
	chords: chord.chords,
	clip,
	midi
};
