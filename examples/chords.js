'use strict';

const scribble = require('../src/');
let clip = scribble.clip({
	notes: 'F#m C#m DM Bm EM AM DM C#m AM',
	pattern: 'x_x_x_--'.repeat(8),
	subdiv: '16n'
});

scribble.midi(clip); // This will create a file called music.mid
// Import the file created in a music production software and play it with a Piano kinda instrument

