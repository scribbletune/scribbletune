'use strict';

const assert = require('assert');
const utils = require('./utils');
const chord = require('./chord');
const loop = require('./loop');

/**
 * Get defauly params for a clip, such as root note, pattern etc
 * @return {Object}
 */
const getDefaultParams = () => ({
	notes: ['C4'],
	pattern: 'x',
	accentMap: '',
	accentHi: 127,
	accentLow: 70,
	shuffle: false,
	sizzle: false,
	arpegiate: false,
	subdiv: '4n'
});

/**
 * HDR speed is denoted by the number of ticks per note
 * By default this is set to a quarter note (4n) to be in line with Tone.js' default subdivision
 * Technically a bar is 512 ticks long. So it's HDR speed is 512
 * @type {Object}
 */
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
const clip = params => {
	// Temporary hack to retain a simple platform agnostic API
	if (params && (params.sample || params.synth)) {
		return loop(params);
	}

	params = Object.assign(getDefaultParams(), params || {});

	// If notes is a string, split it into an array
	if (typeof params.notes === 'string') {
		// Remove any accidental double spaces
		params.notes = params.notes.replace(/\s{2,}/g, ' ');
		params.notes = params.notes.split(' ');
	}

	// Convert chords if any to notes
	params.notes = params.notes.map(el => {
		assert(
			Array.isArray(el) ||
			utils.isNote(el) ||
			chord.getChord(el),
			'el must be a valid note, array of notes or a chord'
		);

		if (utils.isNote(el)) {
			// A note needs to be an array so that it can accomodate chords or single notes with a single interface
			return [el];
		}

		if (chord.getChord(el)) {
			// A note such as c6 could be a chord (sixth) or a note (c on the 6th octave)
			// This also applies to c4, c5, c6, c9, c11
			// TODO: Identify a way to avoid returning unwanted results
			el = chord.getChord(el);
		}

		if (Array.isArray(el)) {
			// This could be a chord provided as an array
			// make sure it uses valid notes
			el.forEach(n => {
				assert(utils.isNote(n), 'array must comprise valid notes');
			});
		}

		return el;
	});

	assert(typeof params.pattern === 'string', 'pattern should be a string');
	assert(/[^x\-_\[\]]/.test(params.pattern) === false, 'pattern can only comprise x - _ [ ]');

	if (params.shuffle) {
		params.notes = utils.shuffle(params.notes);
	}

	let clipNotes = [];
	let step = 0;
	const rApplyPatternToNotes = (arr, length) => {
		arr.forEach(el => {
			if (typeof el === 'string') {
				let note = null;
				// If the note is to be `on`, then it needs to be an array
				if (el === 'x') {
					note = params.notes[step];
					step++;
				}

				// Push only note on OR off messages to the clip notes array
				if (el === 'x' || el === '-') {
					clipNotes.push({ note, length, level: params.accentHi });
				}

				// In case of an underscore, simply extend the previous note's length
				if (el === '_' && clipNotes.length) {
					clipNotes[clipNotes.length - 1].length += length;
				}

				// If the pattern is longer than the notes, then repeat notes
				if (step === params.notes.length) {
					step = 0;
				}
			}
			if (Array.isArray(el)) {
				rApplyPatternToNotes(el, length/el.length)
			}
		});
	};

	rApplyPatternToNotes(utils.expandStr(params.pattern), hdr[params.subdiv] || hdr['4n']);
	return clipNotes;
};

module.exports = clip;
