'use strict';

const scribble = require('../src/');

// Get alternate notes from the C Phrygian mode
var notes = scribble.scale('C2 phrygian').filter((x, i) => i % 2 === 0);

// Generate 4 clips (one for each note) and concat them together
var clip = notes.reduce((accumulator, note) => {
	return accumulator.concat(scribble.clip({
		notes: [note],
		pattern: 'x-x_-xx_'.repeat(4), // Each note will use this pattern
		subdiv: '16n' // use a 16th note as the default duration of a note
	}));
}, []);

// Export a midi file from this clip
scribble.midi(clip);
// This will create a file called music.mid in the same location as you run this script
// Import this file in a music production software and play it with a bass synth