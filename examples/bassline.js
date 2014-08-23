var scribbletune = require('../lib/scribbletune');

/**
 * Generate a bassline by joining a bunch of clips
 */

var clip = 
	scribbletune.generate.clip({
		notes: scribbletune.mode.get('c', 'dorian', 2).slice(0, 3), 
		pattern: 'xxxxxxxx',
		sizzle: true,
		sizzleMap: 'x-------',
		//shuffle: true,
		ticks: 512
	});

var clip2 = 
	scribbletune.generate.clip({
		notes: scribbletune.mode.get('c', 'dorian', 2).slice(1, 3), 
		pattern: 'xxxxxxxx',
		sizzle: true,
		sizzleMap: 'x-----x-',
		//shuffle: true,
		ticks: 1024
	});

var clip3 = 
	scribbletune.generate.clip({
		notes: scribbletune.mode.get('c', 'dorian', 2).slice(0, 3), 
		pattern: 'xxxxxxxx',
		sizzle: true,
		sizzleMap: 'x-------',
		//shuffle: true,
		ticks: 512
	});

scribbletune.midi.writeToFile(clip.concat(clip2,clip3));