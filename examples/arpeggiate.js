'use strict';

const scribble = require('../');

const theChords = scribble.getChordsByProgression(
  'C4 major',
  'i iv i iv i v i II'
);

const notesArr = scribble.arp({
  chords: theChords,
  count: 4, // you can set any number from 2 to 8
  // The default value of order is 01234567 as count is 8 by default
  // but here we set count to 4 hence we are only using the first 4 indices to set a order
  order: '1032',
});

const c = scribble.clip({
  notes: notesArr,
  pattern: 'x[xx]x[xx]x_'.repeat(notesArr.length / 2),
  subdiv: '2n', // Render this same clip with 8n and play both of em together
});

scribble.midi(c, 'arp.mid');
// This will create a file called arp.mid in the same location as you run this script
// Import this file in a music production software and play it with any synth
