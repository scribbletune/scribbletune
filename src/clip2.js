'use strict';

const utils = require('./utils');

/**
 * Get defauly params for a clip, such as root note, pattern etc
 * @return {Object}
 */
const getDefaultParams = () => ({
	notes: ['c4'],
	pattern: 'x',
	accentMap: '',
	accentHi: 127,
	accentLow: 70,
	shuffle: false,
	sizzle: false,
	arpegiate: false,
	subdiv: '4n'
});

const hdr = {
	'1n': 512,
	'2n': 256,
	'4n': 128,
	'8n': 64,
	'16n': 32,
};
/*
params = {
	notes: 'c4',
	pattern: 'x[x[xx]x]x'
}
 */
const clip2 = params => {
	var subdivHdr = hdr[params.subdiv] || hdr['4n'];
	var clipNotes = [];
	var step = 0;

	params = Object.assign(getDefaultParams(), params || {});

	// If notes is a string, split it into an array
	if (typeof params.notes === 'string') {
		// Remove any accidental double spaces
		params.notes = params.notes.replace(/\s{2,}/g, ' ');
		params.notes = params.notes.split(' ');
	}

	function r(arr, length) {
		arr.forEach(function(el, idx) {
			if (typeof el === 'string') {
				// Note needs to be an array
				let note = el === 'x' ? [params.notes[step]] : null
				clipNotes.push({note, length, level: 127});
				step++;
				if (step === params.notes.length) {
					step = 0;
				}
			}
			if (Array.isArray(el)) {
				r(el, length/el.length)
			}
		});
	}

	r(utils.expandStr(params.pattern), subdivHdr);
	return clipNotes;
};

module.exports = clip2;