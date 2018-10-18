'use strict';
const scale = require('./scale');
const chord = require('./chord');

// Allow scale to be denoted by mode as well
module.exports = {
	scale: scale.getScaleNotes,
	mode: scale.getScaleNotes,
	scales: scale.getAvailableScaleNames,
	modes: scale.getAvailableScaleNames,
	chord: chord.getChord,
	chords: chord.chords,
	clip: require('./clip'),
	progression: require('./progression'),
	arp: require('./arp'),
	midi: require('./midi'),
	session: typeof window !== 'undefined' && require('./session')
};
