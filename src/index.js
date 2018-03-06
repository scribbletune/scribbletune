'use strict';
const mode = require('./mode');
const chord = require('./chord');
const clip = require('./clip');
const pattern = require('./pattern');
const midi = require('./midi');

// Allow scale to be denoted by mode as well
module.exports = {
	mode: mode.mode, 
	scale: mode.mode, 
	chord: chord.getChord, 
	listChords: chord.listChords, 
	scales: mode.names, 
	clip, 
	pattern, 
	midi
};
