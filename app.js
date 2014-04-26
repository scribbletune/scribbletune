'use strict';

var Modes = require('./lib/modes');
var Generate = require('./lib/generate');
var Filters = require('./lib/filters');
var Patterns = require('./lib/patterns');
var Utils = require('./lib/utils');

/*
	Process:
	--------
	Please see the README file
*/

//var notes = ['d#4', 'd4', 'd#4', 'c4', 'f4', 'f#4'];
var notes1 = Modes.get('f#', 3 , 'ionian');
var notes2 = Modes.get('f#', 3 , 'lydian');

var bar1 = Generate.bars({
	notesArr: notes1,
	pattern: Patterns.fancy[0],
	bars: 2,
	randomize: true
});

var bar2 = Generate.bars({
	notesArr: notes1,
	pattern: Patterns.fancy[0],
	bars: 2,
	randomize: true
});



var bar = bar1.concat(bar2);



//Apply a filter
bar = Filters.mergeDuplicates(bar);
Utils.visualize(bar);

//write track to midi file
Utils.writeTrackToFile(bar);