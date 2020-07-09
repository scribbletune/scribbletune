'use strict';

const scribble = require('../');

const clip = scribble.clip({
  notes: 'F#m C#m DM Bm EM AM DM C#m AM',
  pattern: 'x_x_x_--'.repeat(8),
  subdiv: '16n',
});

scribble.midi(clip);
// This will create a file called music.mid in the same location as you run this script
// Import this file in a music production software and play it with a Piano kinda instrument

const clip2 = scribble.clip({
  notes: scribble.getChordsByProgression('C4 major', 'vi IV V I'),
  pattern: 'xxxx',
});

console.log(clip2);

scribble.addChord(['1P', '5P', '8P', '22P', '24M', '26P'], [], 'fullM');
scribble.addChord(['1P', '5P', '8P', '22P', '24m', '26P'], [], 'fullm');

const clip3 = scribble.clip({
  notes: ['Efullm', 'GfullM', 'GfullM', "AfullM"],
  pattern: 'x___xx_x________',
});

scribble.midi(clip3, 'chords.mid');
