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

// Generate a pad from the chords used
scribble.midi(
  scribble.clip({
    notes: theChords,
    pattern: 'x___'.repeat(4),
    subdiv: '1n',
  }),
  'pad.mid'
); // This will create a file called pad.mid in the same location as you run this script

// Generate a melody to go along with the arp and the pad
const getRandomPattern = function(count) {
  let str = '';
  for (let i = 0; i < (count || 8); i++) {
    str += Math.round(Math.random()) ? 'x-' : '-x';
  }

  return str;
};

const ptn = getRandomPattern();
const arpedNotes = scribble.arp({
  chords: scribble.getChordsByProgression('G minor', 'i III'),
  count: 4,
  order: '0213',
});

scribble.midi(
  scribble.clip({
    notes: arpedNotes,
    pattern: ptn,
    subdiv: '16n',
  }),
  'melody.mid'
);

// You can use lodash's sampleSize method to randomly select a set of notes
// from a scale to construct random chords
// e.g. https://scribbletune.com/examples/random-chords
const arpedNotesFromChordArr = scribble.arp({
  chords: [
    ['A3', 'F#4', 'A4'],
    ['F#3', 'G4', 'B4'],
    ['B4', 'C3', 'B3'],
    ['E4', 'C4', 'G3'],
    ['G3', 'A3', 'D3'],
    ['G3', 'B4', 'F#4'],
    ['B3', 'F#4', 'G4'],
    ['E4', 'A4', 'D3'],
    ['A4', 'G4', 'A3'],
    ['D3', 'B3', 'A4'],
    ['F#4', 'B3', 'E4'],
    ['C4', 'A3', 'F#4'],
  ],
  count: 4,
  order: '0213',
});

scribble.midi(
  scribble.clip({
    notes: arpedNotesFromChordArr,
    pattern: 'xx-x-xxx'.repeat(5).slice(0, 32),
    subdiv: '16n',
  }),
  'melody2.mid'
);
