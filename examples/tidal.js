'use strict';

const scribble = require('../src/');

let clip = scribble.clip2({
	pattern: 'xx[xx]x'.repeat(8),
	notes: 'F#m C#m DM Bm EM AM DM C#m AM'
});

scribble.midi(clip);
