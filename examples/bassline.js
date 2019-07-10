'use strict';

const scribble = require('../');

const pattern = '[-xRx][-xRx][-xRx][-xRR]'.repeat(4);

const clip = scribble.clip({
  notes: 'C4',
  pattern,
  randomNotes: scribble.scale('D4 phrygian'),
});

const clip2 = scribble.clip({
  notes: 'D4',
  pattern,
  randomNotes: scribble.scale('D4 phrygian'),
});

scribble.midi(clip.concat(clip2));

// Export a midi file from this clip
// scribble.midi(
//   scribble
//     .clip({
//       notes: 'A2',
//       pattern,
//     })
//     .concat(
//       scribble.clip({
//         notes: 'E2',
//         pattern,
//       }),

//       scribble.clip({
//         notes: 'A2',
//         pattern,
//       }),

//       scribble.clip({
//         notes: 'F2',
//         pattern,
//       })
//     )
// );
// This will create a file called music.mid in the same location as you run this script
// Import this file in a music production software and play it with a bass synth
