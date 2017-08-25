'use strict';

const scribble = require('../src/');

let clip = scribble.clip({
	notes: 'c4',
	pattern: 'x---'.repeat(4)
});

scribble.midi(clip);
