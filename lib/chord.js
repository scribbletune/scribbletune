'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.chord = undefined;

var _mode = require('./mode');

var chord = function chord(root, scale, octave, add7) {
	return (0, _mode.mode)(root, scale, octave).filter(function (note, idx) {
		// return only the 1st (0), 3rd (2) and 5th (4) note
		// and the 7th (6) note if add7 is true
		return idx === 0 || idx === 2 || idx === 4 || add7 && idx === 6;
	}).join(',');
};

exports.chord = chord;