'use strict';

const scribble = require('../src/');

let clip = scribble.clip({
	notes: scribble.progression('D4 minor', 'I IV V ii'),
	pattern: 'x_'.repeat(4) + 'x_______'
});

scribble.midi(clip)
// This will create a file called music.mid in the same location as you run this script
// Import this file in a music production software and play it with a piano kinda instrument