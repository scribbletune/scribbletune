'use strict';

var _ = require('lodash');
var Modes = require('./lib/modes');
var Generate = require('./lib/generate');
var Utils = require('./lib/utils');



var straightKick = 'x---x---x---x---';
var straightKickFillers = [
	'x---x---x---x-x-',
	'x---x---x---x-xx',
	//'x-x-----x-x---xx',
];

var ptn = '';

_(4).times(function(n){
	_(4).times(function(n){
		ptn += straightKick;
		if(_.random(0, 1)) {
			ptn += straightKickFillers[_.random(0, straightKickFillers.length-1)];
		} else {
			ptn += straightKick;
		}
	});
});

var bar = Generate.bars({
	notesArr: ['c2'],
	pattern: ptn,
	bars: 32
});


//show what the generated bar looks like
Utils.visualize(bar);

//write track to midi file
Utils.writeTrackToFile(bar);