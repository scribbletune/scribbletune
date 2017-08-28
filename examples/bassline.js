'use strict';

const scribble = require('../src/');

// Most music software consider C3 as middle C, so lets bump it by 1 to ensure our notes are imported as expected
scribble.setMiddleC(5);

// Get alternate notes from the C Phrygian mode
var notes = scribble.mode('c phrygian 2').filter((x, i) => i % 2 === 0);

// Generate 4 clips (one for each note) and concat them together
var clip = notes.reduce((accumulator, note) => {
	return accumulator.concat(scribble.clip({
		notes: [note],	
		pattern: 'x-x_-xx_'.repeat(4), // Each note will use this pattern
		sizzle: true
	}));
}, []);

// Export a midi file from this clip
scribble.midi(clip);
