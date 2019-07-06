'use strict';

const scribble = require('../');
let clip = scribble.clip({
  notes: 'c4',
  pattern: '[-x][-[xR]]'.repeat(16),
});

scribble.midi(clip);
// This will create a file called music.mid in the same location as you run this script
// Import this file in a music production software and play it with a high hats sample
