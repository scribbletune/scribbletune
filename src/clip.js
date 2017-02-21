'use strict';

const assert = require('assert');
const utils = require('./utils');
const chord = require('./chord');

const getdefaultParams = () => ({
	ticks: 512,			// By default a single 4x4 bar is 512 ticks (this is known as HDR_SPEED)
	notes: ['c3'],
	pattern: 'x_______________',
	noteLength: 1 / 16,
	accentMap: '',
	accentHi: 127,
	accentLow: 70,
	shuffle: false,
	sizzle: false
});

const clip = params => {	
	params = Object.assign(getdefaultParams(), params || {});
	let level = params.accentHi;
	let sizzleArr;
	if (params.sizzle) {
		sizzleArr = utils.sizzleMap(level);
	}

	// Check if the note length is a fraction
	// If so convert it to decimal without using eval
	if (typeof params.noteLength === 'string' && params.noteLength.indexOf('/') > 0) {
		let a = params.noteLength.split('/');
		params.noteLength = a[0] / a[1];
	}

	// Convert chords if any to notes
	params.notes = params.notes.map(el => {
		if (Array.isArray(el)) {
			return el.join();
		} else if (chord.isChord(el)) {
			return chord.getChord(el).join();
		} else {
			return el;
		}
	});

	// Validate provided notes
	params.notes.forEach(el => {
		assert(el.match(/[abcdefg]#?[0-9]/g) !== null, el + 'is not a valid note!');
	});

	// Validate provided pattern does not include anything other that x, - OR _
	assert(params.pattern.match(/[^x\-_]+/) === null, params.pattern + 'is not a valid pattern!');

	// Ensure notes array has at least as many elements as pattern
	while (params.notes.length < params.pattern.length) {
		params.notes = params.notes.concat(params.notes);
	}

	// Ensure accent map is as long as the pattern
	if (params.accentMap) {
		while (params.accentMap.length < params.pattern.length) {
			params.accentMap = params.accentMap.concat(params.accentMap);
		}

		// accentMap can be a string (x---x--xx---x) or an Array of numbers (0 to 127)
		// If it s a string, convert it to an array of numbers to be used later while
		// assigning individual volume for each note
		if (typeof params.accentMap === 'string') {
			params.accentMap = params.accentMap.split('');
			params.accentMap = params.accentMap.map(a => a === 'x' ? params.accentHi : params.accentLow);
		}
	}

	// Ensure sizzle array is as long as the pattern
	if (params.sizzle && sizzleArr) {
		while (sizzleArr.length < params.pattern.length) {
			sizzleArr = sizzleArr.concat(sizzleArr);
		}
	}

	// Check if we need to shuffle the notes
	if (params.shuffle) {
		params.notes = utils.shuffle(params.notes);
	}

	// Use string.replace on pattern to derive an array of note objects
	let clipNotes = [], step = 0;

	/**
	 * Look for a note followed by a interval or sustain
	 * @param  {Regex} match The pattern to match (-, x, x-, x_, x__, x____ etc)
	 * @param  {String} noteOn   Note on (denoted by x) with or without sustain (denoted by underscore)
	 * @param  {String} noteOff   Interval (denoted by hyphen)
	 */
	params.pattern.replace(/(x_*)|(-)/g, (match, noteOn, noteOff) => {
		let sizzleVal = level;
		if (params.sizzle) {
			sizzleVal = sizzleArr[step];
		}

		if (params.accentMap) {
			level = params.accentMap[step];
			// Affect the sizzleVal so that the accentMap is carried forward in case of a sizzle
			sizzleVal = level;
		}

		if (noteOn) {
			// Found x OR x- OR x__
			clipNotes.push({
				// A note can be a single note like c3 or comma separated string to denote chords c3,e3,g3
				note: params.notes[step].split(','),
				length: params.noteLength * noteOn.length * params.ticks,
				level: params.sizzle ? sizzleVal : level
			});

			// Increment step to proceed in the notes array
			step++;
		}

		if (noteOff) {
			// Found - (hyphen) - note off
			clipNotes.push({
				note: null,
				length: params.noteLength * params.ticks
			});
		}
	});

	return clipNotes;
}

module.exports = clip;
