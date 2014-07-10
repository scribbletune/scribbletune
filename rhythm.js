'use strict';

var _ = require('lodash');
var Modes = require('./lib/modes');
var Generate = require('./lib/generate');
var Utils = require('./lib/utils');



var rythm = 'x-xxx-xx-x--x_xx';
var rythmFillers = [
	'x-xxx---x---x-xx',
	'x__xx---x---x_x_'
];

var ptn = '';

_(2).times(function(n){
	_(2).times(function(n){
		ptn += rythm;
		if(_.random(0, 1)) {
			ptn += rythmFillers[_.random(0, rythmFillers.length-1)];
		} else {
			ptn += rythm;
		}
	});
});

var bar = Generate.bars({
	notesArr: Modes.get('f#', 2, 'aeolian'),
	pattern: ptn,
	bars: 32
});


//show what the generated bar looks like
Utils.visualize(bar);

//write track to midi file
Utils.writeTrackToFile(bar);