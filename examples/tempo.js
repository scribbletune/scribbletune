'use strict';

const scribble = require('../');

let clip = scribble.clip({
  notes: scribble.scale('C4 minor'),
  pattern: 'x'.repeat(8),
});

// When generating a MIDI file the beat per minute (BPM) value
// can be set using the third parameter of the midi method.

// Creates a MIDI file with a BPM set to the default value - 120?
scribble.midi(clip, 'tempo_default.mid');
// Creates a MIDI file with a BPM set to 200
scribble.midi(clip, 'tempo_200.mid', 200);

// In case you want to use the default file name with the bpm argument
// use undefined for the file name
// scribble.midi(clip, undefined, 200);
