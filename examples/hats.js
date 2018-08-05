'use strict';

const scribble = require('../src/');
let clip = scribble.clip({
	notes: 'c4',
	pattern: '[xxxx]'.repeat(4),
	sizzle: true
});

scribble.midi(clip);
