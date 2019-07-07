'use strict';

const scribble = require('../');
const theChords = scribble.getChordsByProgression('G minor', 'i III v VI');

const notesArr = scribble.arp({
  chords: theChords,
  count: 4, // you can set any number from 2 to 8
  // The default value of order is 01234567 as count is 8 by default
  // but here we set count to 4 hence we are only using the first 4 indices to set a order
  order: '0103',
});

scribble.midi(
  scribble.clip({
    notes: notesArr,
    pattern: '[RxRx]'.repeat(8),
  }),
  'arp.mid'
); // This will create a file called arp.mid in the same location as you run this script

scribble.midi(
  scribble.clip({
    notes: theChords,
    pattern: 'x___'.repeat(4),
    subdiv: '1n',
  }),
  'pad.mid'
); // This will create a file called pad.mid in the same location as you run this script
