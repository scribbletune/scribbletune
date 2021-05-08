const rkmidi = require('runkit-midi');
const scribble = require('scribbletune');

const clip = scribble.clip({
  notes: [...scribble.scale('D4 minor'), 'D5'],
  pattern: 'xxxxxxxx'
});

rkmidi(scribble.midi(clip, null));
