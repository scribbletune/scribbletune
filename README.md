Scribbletune (WIP)
------------------

Generate musical patterns with JavaScript and export as MIDI files using node.js

### Install

`npm install scribbletune`

### Scribble a tune

Generate a Midi file with the C Major scale:

`./node_modules/scribbletune/bin/scribbletune`

Generate a MIDI file with the C Phrygian mode in the second octave

`./node_modules/scribbletune/bin/scribbletune --root c --octave 2 --mode phrygian`

Generate a MIDI file with the pattern: x---x---x___x---

`./node_modules/scribbletune/bin/scribbletune --pattern x---x---x___x---`


### Patterns

Patterns are denoted by a string made up of x, - and \_ where `x` stands for noteOn, `-` stand for noteOff and `_` stands for sustain. 

### Note

You will need an application like Ableton Live or Reason or Garage Band to use the generated MIDI file. The file will be generated in the same directory as `music.mid`