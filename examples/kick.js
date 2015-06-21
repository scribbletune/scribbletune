var _ = require('lodash');
var scribble = require('../lib/scribbletune');

clip0 = scribble.clip({
	notes: ['c1'],
	pattern: 'x---x---x---x---x-x-x-x-x-x-x-x-'
});

var clip1 = scribble.clip({
	notes: ['c1'],
	pattern: scribble.pattern(1, 16, 'x')
});

var clip2 = scribble.clip({
	notes: ['c1'],
	pattern: scribble.pattern(1, 16, 'x'),
	ticks: 256
});

var clip3 = scribble.clip({
	notes: ['c1'],
	pattern: scribble.pattern(1, 32, 'x'),
	ticks: 128
});

scribble.render(clip0.concat(clip1, clip2, clip3));
