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

var notes = ['g1', 'a#1', 'c2', 'a1', 'a#1', 'd2', 'g1', 'c2', 'f#1', 'a#1'];
//var notes = Modes.get('f', 2, 'phrygian');

bar = Generate.bars({
	notesArr: notes,
	pattern: Patterns.fancy[2],
	bars: 8
});

//Apply a filter
//bar = Filters.counterpoint(bar);
console.log(bar);

//write track to midi file
Utils.writeTrackToFile(bar);