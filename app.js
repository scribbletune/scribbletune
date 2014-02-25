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

var notes = ['c4', 'd#4', 'f4', 'g4', 'b4', 'c5', 'g#4', 'g4'];
//var notes = Modes.get('f', 2, 'phrygian');

bar = Generate.bars({
	notesArr: notes,
	pattern: Patterns.fancy[0],
	bars: 8,
	randomize: true
});

//Apply a filter
bar = Filters.mergeDuplicates(bar);
console.log(bar);

//write track to midi file
Utils.writeTrackToFile(bar);