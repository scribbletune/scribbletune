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

//decide what notes to use from the arguments passed
//check if any of this needs to be changed
var argv = require('minimist')(process.argv.slice(2));
console.log(argv);

var rootNote 										= argv.root || argv.r || 'c';
var defaultOctave 							= argv.octave || argv.o || 3;
var defaultMode 								= argv.mode || argv.m || 'ionian';
//the following take arguments in the long form only
var defaultNumberOfBars 				= argv.bars || 2;
var defaultNotesArr 						= argv.notes && argv.notes.split(',') || Modes.get(rootNote, defaultOctave, defaultMode);
var defaultPattern 							= argv.pattern || argv.p || Patterns.fancy[0];
var defaultRandomize 						= argv.randomize || true;
//show notes in a table after generating em
var showVisualization 					= argv.visualize || false;



var bar = Generate.bars({
	notesArr: defaultNotesArr,
	pattern: defaultPattern,
	bars: defaultNumberOfBars,
	randomize: defaultRandomize
});


//Apply a filter
//bar = Filters.mergeDuplicates(bar);

//show what the generated bar looks like
showVisualization && Utils.visualize(bar);

//write track to midi file
Utils.writeTrackToFile(bar);