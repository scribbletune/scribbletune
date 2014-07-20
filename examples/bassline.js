var st = require('../lib/scribbletune');

/**
 * Generate a bassline by joining a bunch of clips
 */

var clip = 
	st.generate.clip({
		notes: ['c2'], 
		pattern: '--x---x---x---x-'
	});

st.midi.writeToFile(clip);