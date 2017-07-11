'use strict';

const scribble = require('../src/');

let clip = scribble.clip({
	notes: scribble.mode('c major 4'),
	pattern: 'x_'.repeat(8)
});

scribble.midi(clip);
