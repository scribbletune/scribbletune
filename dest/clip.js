'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var getdefaultParams = function getdefaultParams() {
	return {
		ticks: 512, // By default a single 4x4 bar is 512 ticks (this is known as HDR_SPEED)
		notes: ['c3'],
		pattern: 'x_______________',
		noteLength: 1 / 16,
		accentMap: '',
		accentHi: 127,
		accentLow: 70,
		shuffle: false,
		sizzle: false
	};
};

var extendObject = function extendObject(original, updated) {
	for (var i in updated) {
		if (original[i]) {
			original[i] = updated[i];
		}
	}

	return original;
};

var shuffle = function shuffle(arr) {
	var lastIndex = arr.length - 1;
	arr.map(function (el, idx) {
		var rnd = Math.round(Math.random() * lastIndex);
		arr[idx] = arr[rnd];
		arr[rnd] = el;
	});

	return arr;
};

var clip = function clip() {
	var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	params = extendObject(getdefaultParams(), params);
	var level = params.accentHi;

	// Check if the note length is a fraction
	// If so convert it to decimal without using eval
	if (typeof params.noteLength === 'string' && params.noteLength.indexOf('/') > 0) {
		var a = params.noteLength.split('/');
		params.noteLength = a[0] / a[1];
	}

	// Validate provided notes
	params.notes.map(function (el) {
		if (el.match(/[abcdefg]#?[0-9]/g) === null) {
			throw new Error(el + 'is not a valid note!');
		}
	});

	// Validate provided pattern
	params.pattern.split('').map(function (el) {
		if (el.match(/x|-|_/g) === null) {
			throw new Error(pattern + 'is not a valid pattern!');
		}
	});

	// Ensure notes array has at least as many elements as pattern
	while (params.notes.length < params.pattern.length) {
		params.notes = params.notes.concat(params.notes);
	}

	// Ensure sizzle map is as long as the pattern
	if (params.sizzle && params.accentMap) {
		while (params.accentMap.length < params.pattern.length) {
			params.accentMap = params.accentMap.concat(params.accentMap);
		}
	}

	// Check if we need to shuffle the notes
	if (params.shuffle) {
		params.notes = shuffle(params.notes);
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
	params.pattern.replace(/(x_*)|(-)/g, function (match, noteOn, noteOff) {
		var sizzleVal = level;
		if (params.sizzle) {
			sizzleVal = Math.round(Math.abs(Math.cos(step) * params.accentHi));
		}

		if (params.accentMap !== '') {
			if (params.accentMap[step] === 'x') {
				// this is an accent
				level = params.accentHi;

				// also affect the sizzleVal so that the accentMap is carried forward in case of a sizzle
				sizzleVal = level;
			} else {
				// since this is not an accent, lower the level to implement accents
				level = params.accentLow;
			}
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
};

exports.default = clip;