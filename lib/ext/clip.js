'use strict';
/**
 * Scribbletune:Generate
 * -----------------------------------
 * The generate object puts together a clip of notes based on
 * the pattern and notes provided
 */
var __ = require('lodash');

module.exports = function(Scribbletune) {

	/**
	 * Setup defaults
	 */
	var defaultParams = {
		ticks: 512,			// A single 4x4 ticks is 512 ticks
		notes: ['c3'],
		pattern: 'x_______________',
		noteLength: 1 / 16,
		sizzleMap: '',
		shuffle: false,
		sizzle: false
	},
	Generate = function() {};

	/**
	 * Generate a clip based on a pattern, notes and note duration
	 * @param {Array} notes Default: ['c3']
	 * @param {String} pattern Default: 'x________________'
	 * @param {Number} noteLength Default: 1/16 (Valid values: 1/16 (for a SIXTEENTH) 1/8 (for a EIGTH) 1 (for WHOLE) etc)
	 *
	 * @return {Array}         An array of notes
	 *
	 * Sample output:
	 * [{note:'c3', length:32}, {note:'', length:32}, {note:'d3', length: 64}]
	 */
	Generate.clip = function(params) {

		// Setup a defaults if missing
		params = params || defaultParams;

		// Maybe a params is passed but it misses something
		var	ticks = params.ticks || defaultParams.ticks,
			notes = params.notes || defaultParams.notes,
			pattern = params.pattern || defaultParams.pattern,
			noteLength = params.noteLength || defaultParams.noteLength,
			sizzle = params.sizzle || false,
			sizzleMap = params.sizzleMap || defaultParams.sizzleMap,
			shuffle = params.shuffle || defaultParams.shuffle,
			level = 127;

		// Check if the note length is a fraction
		// If so convert it to decimal
		if (noteLength.indexOf('/') > 0) {
			var a = noteLength.split('/');
			noteLength = a[0] / a[1];
		}

		// Validate provided notes
		notes.map(function(el) {
			if (el.match(/[abcdefg]#?[0-9]/g) === null) {
				throw new Error(el + 'is not a valid note!');
			}
		});

		// Validate provided pattern
		pattern.split('').map(function(el) {
			if (el.match(/x|-|_/g) === null) {
				throw new Error(pattern + 'is not a valid pattern!');
			}
		});

		// Ensure notes array has at least as many elements as pattern
		while (notes.length < pattern.length) {
			notes = notes.concat(notes);
		}

		// Ensure sizzle map is as long as the pattern
		if (sizzle && sizzleMap) {
			while (sizzleMap.length < pattern.length) {
				sizzleMap = sizzleMap.concat(sizzleMap);
			}
		}

		// Check if we need to shuffle the notes
		if (shuffle) {
			notes = __.shuffle(notes);
		}

		// Use string.replace on pattern to derive an array of note objects
		var clipNotes = [], step = 0;

		/**
		 * Look for a note followed by a interval or sustain
		 * @param  {Regex} match The pattern to match (-, x, x-, x_, x__, x____ etc)
		 * @param  {String} $1   Note on (denoted by x) with or without sustain (denoted by underscore)
		 * @param  {String} $2   Interval (denoted by hyphen)
		 */
		pattern.replace(/(x_*)|(-)/g, function(match, $1, $2) {

			var sizzleVal = level;
			if (sizzle) {
				sizzleVal = Math.round(Math.abs(Math.cos(step) * 127));
			}

			if (sizzleMap !== '') {
				if (sizzleMap[step] === 'x') {
					// this is an accent
					level = 127;

					// also affect the sizzleVal so that the sizzleMap is carried forward in case of a sizzle
					sizzleVal = 127;
				} else {
					// since this is not an accent, lower the level to implement accents
					level = 70;
				}
			}

			if ($1) {
				// Found x OR x- OR x__
				clipNotes.push({
					note: notes[step],
					length: noteLength * $1.length * ticks,
					level: sizzle ? sizzleVal : level
				});

				// Increment step to proceed in the notes array
				step++;
			}

			if ($2) {

				// Found - (hyphen) - note off
				clipNotes.push({
					note: '',
					length: noteLength * ticks
				});
			}

		});

		return clipNotes;
	};

	Scribbletune.clip = Generate.clip;

};
