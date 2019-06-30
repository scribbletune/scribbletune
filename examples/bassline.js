'use strict';

const scribble = require('../');

const pattern = '[-xxx]'.repeat(16);

const clip = scribble.clip({
  notes: 'A2',
  pattern,
});

console.log(clip);

scribble.midi(clip);

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
