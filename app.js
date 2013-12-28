

var Modes = require('./lib/modes');
var Generate = require('./lib/generate');
var Filters = require('./lib/filters');
var Patterns = require('./lib/patterns');
var Utils = require('./lib/utils');

/*
	Process:
	--------
	- Use the Modes module to get a bunch of notes or Manually set an array of notes which act as the palette
	- Generate the required number of bars/beats from this palette
	- Apply a pattern 
	- Apply filters
	- Render track to a Midi file
*/

//var palette = Modes.get('f', 2, 'phrygian');
var palette = ['c3', 'd3'];
console.log(palette);

bar = Generate.bars(palette);
//bar = Filters.patternize(bar, Patterns.triplets1);

console.log(bar);

//write track
//Utils.writeTrackToFile(bar, 'bar.mid');


