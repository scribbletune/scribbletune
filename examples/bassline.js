var st = require('../lib/scribbletune');

/**
 * Generate a bassline by joining a bunch of clips
 */

var clip = 
	st.generate.clip({
		notes: st.mode.get('d', 'melodic minor'), 
		pattern: '--x---x---x---x-'
	});

st.midi.writeToFile(clip);