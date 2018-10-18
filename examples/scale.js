'use strict';

const scribble = require('../src/');

let clip = scribble.clip({
	notes: scribble.scale('C4 major'),
	pattern: 'x'.repeat(8)
});

scribble.midi(clip);
// This will create a file called music.mid in the same location as you run this script
// Import this file in a music production software and play it with a piano kinda instrument