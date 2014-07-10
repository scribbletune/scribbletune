'use strict';

var _ = require('lodash');
var Modes = require('./lib/modes');
var Generate = require('./lib/generate');
var Utils = require('./lib/utils');


var straightBass = '-xxx-xxx-xxx-xxx';
var straightBassFillers = [
	'--xx--x--xx-x-xx',
	//'x-x-x-xxxxx-x-xx',
	'-xxx--xxx-xx-xx-',
];
var ptn = '';

_(4).times(function(n){
	_(4).times(function(n){
		ptn += straightBass;
		if(_.random(0, 1)) {
			ptn += straightBassFillers[_.random(0, straightBassFillers.length-1)];
		} else {
			ptn += straightBass;
		}
	});
});

var bar = Generate.bars({
	notesArr: Modes.get('c#', 2, 'phrygian').slice(0, 1),
	pattern: ptn,
	bars: 32 
});


//show what the generated bar looks like
Utils.visualize(bar);

//write track to midi file
Utils.writeTrackToFile(bar);