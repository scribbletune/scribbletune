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
var notes = Modes.get('d#', 3 , 'phrygian');

/*var bar = Generate.bars({
	notesArr: notes,
	pattern: Patterns.generate(),
	bars: 8,
	randomize: true
});*/

notes = Modes.get('g#', 4  , 'lydian');
var bar1 = Generate.bars({
	notesArr: notes,
	pattern: Patterns.fancy[0],
	bars: 2,
	randomize: true
});

notes = Modes.get('f# ', 4 , 'lydian');
var bar2 = Generate.bars({
	notesArr: notes,
	pattern: Patterns.fancy[0],
	bars: 2,
	randomize: true
});

notes = Modes.get('g#', 4 , 'lydian');
var bar3 = Generate.bars({
	notesArr: notes,
	pattern: Patterns.fancy[0],
	bars: 2,
	randomize: true
});

notes = Modes.get('f# ', 4  , 'lydian');
var bar4 = Generate.bars({
	notesArr: notes,
	pattern: Patterns.fancy[0],
	bars: 2,
	randomize: true
});

var bar = bar1.concat(bar2, bar3, bar4);
//Apply a filter
bar = Filters.mergeDuplicates(bar);
Utils.visualize(bar);

//write track to midi file
Utils.writeTrackToFile(bar);