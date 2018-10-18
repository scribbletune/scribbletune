'use strict';

const scribble = require('../src/');
let clip = scribble.clip({
	notes: 'c4',
	pattern: '[x-xx]'.repeat(4)
});

scribble.midi(clip);
// This will create a file called music.mid in the same location as you run this script
// Import this file in a music production software and play it with a high hats sample
