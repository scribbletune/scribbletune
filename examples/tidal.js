'use strict';

const scribble = require('../src/');

let clip = scribble.clip({
	pattern: 'x[-x]',
	notes: 'c3'
});

scribble.midi(clip);
