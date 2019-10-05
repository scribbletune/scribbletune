'use strict';

const scribble = require('../');
const minorChordProgression = scribble.progression('m').join(' ');
const c = scribble.clip({
  notes: 'D3',
  pattern: '[x-RR]'.repeat(16), // R will play notes from our progression
  randomNotes: scribble.arp({
    chords: scribble.getChordsByProgression('D4 minor', minorChordProgression), // We are using the `m` method we generated earlier from our factory method
    count: 4,
    order: '1032',
  }),
});

scribble.midi(c, 'progression.mid');
