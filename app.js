

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

var palette = Modes.get('f', 2, 'phrygian');
//var palette = ['c3', 'd3', 'e3', 'f3'];
console.log('palette:', palette);

bar = Generate.bars({
	notesArr: palette,
	numberOfBars: 2
});

bar = Filters.patternize(bar, Patterns.triplets1);
bar = Filters.randomize(bar);
bar = Filters.patternize(bar, Patterns.triplets1);
console.log('bar:', bar);

//write track
Utils.writeTrackToFile(bar, 'bar.mid');


