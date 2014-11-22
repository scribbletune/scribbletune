var scribble = require('../lib/scribbletune');

/**
 * Generate a bassline by joining a bunch of clips
 */

var clip = 
	scribble.clip({
		notes: scribble.mode('c', 'dorian', 2).slice(0, 3), 
		pattern: 'xxxxxxxx',
		sizzle: true,
		sizzleMap: 'x-------',
		//shuffle: true,
		ticks: 512
	});

var clip2 = 
	scribble.clip({
		notes: scribble.mode('c', 'dorian', 2).slice(1, 3), 
		pattern: 'xxxxxxxx',
		sizzle: true,
		sizzleMap: 'x-----x-',
		//shuffle: true,
		ticks: 1024
	});

var clip3 = 
	scribble.clip({
		notes: scribble.mode('c', 'dorian', 2).slice(0, 3), 
		pattern: 'xxxxxxxx',
		sizzle: true,
		sizzleMap: 'x-------',
		//shuffle: true,
		ticks: 512
	});

scribble.render(clip.concat(clip2,clip3));