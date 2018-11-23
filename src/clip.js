'use strict';

const assert = require('assert');
const utils = require('./utils');
const chord = require('./chord');
const browserClip = typeof window !== 'undefined' && require('./browserClip');

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
	subdiv: '4n',
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

/**
 * Transform note/chord string into nested arrays of notes.
 */
const expandNotes = (notes) => {
	if (typeof notes === 'string') {
		// Remove any accidental double spaces
		notes = notes.replace(/\s{2,}/g, ' ');
		notes = notes.split(' ');
	}

	return notes.map(el => {
		assert(
			Array.isArray(el) ||
			utils.isNote(el) ||
			chord.getChord(el),
			el + ' must be a valid note, array of notes or a chord'
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
}

/**
 * Translate the pattern string into a sequence of callbacks
 * that provide the noteIndex, duration, and divisor where
 * duration is a multiplier for the divisor.
 */
const _recursivelyApplyPattern = (pattern, callback, count, divisor) => {
	let index = 0;
	while(index < pattern.length) {
		let el = pattern[index];
		if(el === 'x') {
			let end = index + 1;
			while(end < pattern.length && pattern[end] === '_') {
				end++;
			}
			let duration = end - index;
			callback({noteIndex:count, duration, divisor});
			count++;
			index = end;
			continue;
		}
		if(el === '_') {
			// no note just continue?
			index++
			continue;
		}
		if(el === '-') {
			callback({duration:1, divisor});
			index++;
			continue;
		}
		if(Array.isArray(el)) {
			count = _recursivelyApplyPattern(el, callback, count, divisor*el.length);
			index++;
			continue;
		}
		index++;
	}
	return count;
}
const applyPattern = (pattern, callback) => {
	const expanded = utils.expandStr(pattern);
	_recursivelyApplyPattern(expanded, callback, 0, 1);
}

const createCommonBase = (params) => {
	params.notes = expandNotes(params.notes);
	assert(typeof params.pattern === 'string', 'pattern should be a string');
	assert(/[^x\-_\[\]]/.test(params.pattern) === false, 'pattern can only comprise x - _ [ ]');

	if (params.shuffle) {
		params.notes = utils.shuffle(params.notes);
	}

	let clipNotes = [];
	let index = 0;
	applyPattern(params.pattern, ({noteIndex, duration, divisor})=>{
		clipNotes[index] = {
			note:noteIndex !== undefined ? params.notes[noteIndex % params.notes.length] : null,
			divisor,
			duration,
			level:params.accentHi
		}
		index++;
	});
	params.base = clipNotes;
	return params;
}

const asMidi = (params) =>{
	const quant =hdr[params.subdiv] || hdr['4n'];
	return params.base.map(({note, divisor, level, duration})=>{
		return {
			note,
			length:duration*quant/divisor,
			level
		}
	});
}

/*
params = {
	notes: 'c4',
	pattern: 'x[x[xx]x]x'
}
 */
const clip = params => {
	params = Object.assign(getDefaultParams(), params || {});
	params = createCommonBase(params);
	if (params.synth || params.instrument || params.sample || params.player || params.samples || params.sampler) {
		return browserClip(params);
	}
	return asMidi(params);
};

module.exports = clip;
