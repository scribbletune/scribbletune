const rkmidi = require('runkit-midi');
const scribble = require('scribbletune');

const clip = scribble.clip({
  notes: scribble.scale('C4 major'),
  pattern: 'xxxxxxx'
});

rkmidi(scribble.midi(clip, null));
