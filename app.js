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
var notes = Modes.get('d#', 3, 'phrygian');

bar = Generate.bars({
	notesArr: notes,
	pattern: Patterns.generate(),
	bars: 8,
	randomize: true
});

//Apply a filter
bar = Filters.mergeDuplicates(bar);
Utils.visualize(bar);

//write track to midi file
Utils.writeTrackToFile(bar);