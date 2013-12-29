var Modes = require('./lib/modes');
var Generate = require('./lib/generate');
var Filters = require('./lib/filters');
var Patterns = require('./lib/patterns');
var Utils = require('./lib/utils');

/*
	Process:
	--------
	- Use the Modes module to get a bunch of notes or Manually set an array of notes
	- Generate a bar of music of the required number of bars/beats from the notes array
	- Specify a pattern
	- Apply filter(s)
	- Render track to a Midi file
*/

var notes = Modes.get('f', 2, 'phrygian');
//var notes = ['c3', 'd3', 'e3', 'f3'];

bar = Generate.bars({
	notesArr: notes,
	randomize: true,
	bars: 4
});

//bar = Filters.patternize(bar, Patterns.triplets);
console.log('bar:', bar);

//write track to midi file
Utils.writeTrackToFile(bar, 'bar.mid');