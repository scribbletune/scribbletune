'use strict';

const scribble = require('../src/');

let clip = scribble.clip({
	pattern: 'xx_[x[-x]]',
	notes: 'c4'
});

scribble.midi(clip);
