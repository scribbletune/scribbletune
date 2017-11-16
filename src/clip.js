'use strict';

const assert = require('assert');
const utils = require('./utils');
const chord = require('./chord');
const jsmUtils = require('jsmidgen').Util;

/**
 * Get defauly params for a clip, such as root note, pattern etc
 * @return {Object}
 */
const getdefaultParams = () => ({
	ticks: 512,			// By default a single 4x4 bar is 512 ticks (this is known as HDR_SPEED)
	notes: ['c3'],
	pattern: 'x_______________',
	noteLength: 1 / 16,
	accentMap: '',
	accentHi: 127,
	accentLow: 70,
	shuffle: false,
	sizzle: false,
	arpegiate: false
});

/**
 * Get default params for the arpegiate property
 * @return {Object}
 */
const getDefaultArpegiateParams = () => ({
	distance: 12,
	steps: 1
});

/**
 * Get arpegiated (transposed by distance) notes
 * @return {Object}
 */
const getArpedNotes = (notes, distance) => {
	return notes.map(note => {
		let noteMidiNum = jsmUtils.midiPitchFromNote(note);
		let transposedMidiNum = noteMidiNum + distance;
		return jsmUtils.noteFromMidiPitch(transposedMidiNum);
	});
};


/**
 * A clip is a container of a musical idea based on the params passed to it
 * @param  {Object} params Extend base parans object derived from getdefaultParams
 * @return {Object} The return object is used with the `midi` method to generate a MIDI file
 */
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

	// If notes is a string, split it into an array
	if (typeof params.notes === 'string') {
		// Remove any accidental double spaces
		params.notes = params.notes.replace(/\s{2,}/g, ' ');
		params.notes = params.notes.split(' ');
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
		assert(el.match(/[a-gA-G]#?[0-9]/g) !== null, el + ' is not a valid note!');
	});

	// Validate provided pattern does not include anything other than x, - OR _
	assert(params.pattern.match(/[^x\-_]+/) === null, params.pattern + ' is not a valid pattern!');

	// Update notes array in case of arpegiate
	if (params.arpegiate) {
		if (typeof params.arpegiate === 'object') {
			params.arpegiate = Object.assign(getDefaultArpegiateParams(), params.arpegiate);
		} else {
			params.arpegiate = getDefaultArpegiateParams();
		}

		// If the notes are c3 and f3 and the steps are 2 and distance is 12 (octave)
		// Then, make 2 arrays of notes that 12 semitones more than the given notes
		// So in this example, the 2 arrays would be [c4, f4] and [c5, f5]
		// Concatentate these 2 new arrays with the existing notes to create an arpegiated sequence
		let tmpNotes = params.notes;
		for (var i = 0; i < params.arpegiate.steps; i++) {
			let arpedNotes = getArpedNotes(tmpNotes, params.arpegiate.distance);
			params.notes = params.notes.concat(arpedNotes);
			tmpNotes = arpedNotes;
		}
	}

	// Ensure notes array has at least as many elements as pattern
	if (params.notes.length < params.pattern.length) {
		while (params.notes.length < params.pattern.length) {
			params.notes = params.notes.concat(params.notes);
		}
		// Clip off extra notes
		params.notes = params.notes.slice(0, params.pattern.length);
	}

	// Ensure pattern is as long as number of notes
	if (params.pattern.length < params.notes.length) {
		let originalPattern = params.pattern;
		while (params.pattern.length < params.notes.length) {
			params.pattern = params.pattern + originalPattern;
		}
		// Clip off extra chars
		params.pattern = params.pattern.slice(0, params.notes.length);
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
