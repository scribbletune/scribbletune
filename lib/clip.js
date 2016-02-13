'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.clip = undefined;

var _lodash = require('lodash');

var __ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var defaultParams = {
	ticks: 512, // A single 4x4 ticks is 512 ticks
	notes: ['c3'],
	pattern: 'x_______________',
	noteLength: 1 / 16,
	sizzleMap: '',
	shuffle: false,
	sizzle: false
};

var clip = function clip() {
	var params = arguments.length <= 0 || arguments[0] === undefined ? defaultParams : arguments[0];

	// Maybe a params is passed but it misses something
	var ticks = params.ticks || defaultParams.ticks;
	var notes = params.notes || defaultParams.notes;
	var pattern = params.pattern || defaultParams.pattern;
	var noteLength = params.noteLength || defaultParams.noteLength;
	var sizzle = params.sizzle || false;
	var sizzleMap = params.sizzleMap || defaultParams.sizzleMap;
	var shuffle = params.shuffle || defaultParams.shuffle;
	var level = 127;

	// Check if the note length is a fraction
	// If so convert it to decimal without using eval
	if (typeof noteLength === 'string' && noteLength.indexOf('/') > 0) {
		var a = noteLength.split('/');
		noteLength = a[0] / a[1];
	}

	// Validate provided notes
	notes.map(function (el) {
		if (el.match(/[abcdefg]#?[0-9]/g) === null) {
			throw new Error(el + 'is not a valid note!');
		}
	});

	// Validate provided pattern
	pattern.split('').map(function (el) {
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
	var clipNotes = [],
	    step = 0;

	/**
  * Look for a note followed by a interval or sustain
  * @param  {Regex} match The pattern to match (-, x, x-, x_, x__, x____ etc)
  * @param  {String} noteOn   Note on (denoted by x) with or without sustain (denoted by underscore)
  * @param  {String} noteOff   Interval (denoted by hyphen)
  */
	pattern.replace(/(x_*)|(-)/g, function (match, noteOn, noteOff) {
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

		if (noteOn) {
			// Found x OR x- OR x__
			clipNotes.push({
				// A note can be a single note like c3 or comma separated string to denote chords c3,e3,g3
				note: notes[step].split(','),
				length: noteLength * noteOn.length * ticks,
				level: sizzle ? sizzleVal : level
			});

			// Increment step to proceed in the notes array
			step++;
		}

		if (noteOff) {
			// Found - (hyphen) - note off
			clipNotes.push({
				note: null,
				length: noteLength * ticks
			});
		}
	});

	return clipNotes;
};

exports.clip = clip;