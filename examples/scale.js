'use strict';

const scribble = require('../src/');

let clip = scribble.clip({
	notes: scribble.scale('C4 major'),
	pattern: 'x_'.repeat(8)
});

scribble.midi(clip);
