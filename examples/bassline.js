var scribbletune = require('../src/lib/scribbletune');

/**
 * Generate a bassline by joining a bunch of clips
 */

var clip = 
	scribbletune.generate.clip({
		notes: ['c2'], 
		pattern: '--x---x---x---x-'
	});

scribbletune.midi.writeToFile(clip);