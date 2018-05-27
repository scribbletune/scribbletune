'use strict';

const scribble = require('../src/');

let clip = scribble.clip2({
	pattern: 'xx[xx]x',
	notes: ['c4', 'd#4', 'e4']
});

scribble.midi(clip);
