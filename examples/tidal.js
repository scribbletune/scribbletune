'use strict';

const scribble = require('../src/');

let clip = scribble.clip2({
	pattern: '[-[-x--]-x][--[x-]x][---x][-[x-]x-]',
	notes: 'c4'
});

scribble.midi(clip);
