'use strict';

const scribble = require('../src/');
let clip = scribble.clip({
	notes: 'F#m C#m DM Bm EM AM DM C#m AM',
	pattern: 'x_x_x_--'.repeat(8),
	sizzle: true
});

scribble.midi(clip);

