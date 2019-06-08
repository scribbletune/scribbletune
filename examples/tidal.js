'use strict';

const scribble = require('../');

const gMelMn = scribble.scale('G4 melodic minor').slice(0, 5);
const bFlatMelMn = scribble.scale('Bb3 melodic minor').slice(0, 7);

const getMelody = () => {
  const clipA = scribble.clip({
    pattern: '[xxx]',
    notes: bFlatMelMn,
    shuffle: true,
  });

  const clipB = scribble.clip({
    pattern: 'x',
    notes: gMelMn,
    shuffle: true,
  });

  return clipA.concat(clipB);
};

scribble.midi(getMelody().concat(getMelody(), getMelody(), getMelody()));
// This will create a file called music.mid in the same location as you run this script
// Import this file in a music production software and play it with any synth
