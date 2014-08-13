var scribbletune = require('../lib/scribbletune');

/**
 * Generate a bassline by joining a bunch of clips
 */

var clip = 
	scribbletune.generate.clip({
		notes: scribbletune.mode.get('c', 'phrygian', 2).slice(0, 3), 
		pattern: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		sizzle: true,
		sizzleMap: 'x-------x-----x-x-------------x-x-------x-----x-x-------------x-',
		shuffle: true
	});

scribbletune.midi.writeToFile(clip);