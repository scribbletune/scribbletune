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

//var notes = ['c3', 'd3', 'e3', 'f3'];
var notes = Modes.get('f', 2, 'phrygian');

bar = Generate.bars({
	notesArr: notes,
	randomize: true,
	pattern: Patterns.fancy[1]
});

//Apply a filter
//bar = Filters.counterpoint(bar);
console.log(bar);

//write track to midi file
Utils.writeTrackToFile(bar);