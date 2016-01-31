Scribbletune (WIP)
------------------

Generate musical patterns with JavaScript and export as MIDI files using node.js

### Install

`npm install scribbletune`

### Generate

You can `require` the scribbletune module and use it to generate modes and patterns to create melodies. For example, to create a 16 beat simple bass line comprising of the first 3 notes of the C phrygian mode on the second octave, you could create a new file and add some code like this:

```
var scribble = require('scribbletune');

var clip = scribble.clip({
    notes: scribble.mode('c', 'phrygian', 2).slice(0, 3),
	pattern: '-xxx-xxx-xxx-xxx',
	sizzle: true
});

scribble.render(clip, 'bass.mid');
```
This will create a MIDI file called bass.mid in the same location as the above file.

### Patterns

Patterns are denoted by a string made up of x, - and \_ where `x` stands for noteOn, `-` stand for noteOff and `_` stands for sustain. Patterns can be used to create sizzle maps (which are basically accent maps to hit some notes harder than others)

### Chords

You can add chords to the `notes` array while creating a clip to render chords. Either provide the notes of the chords you want separated by commas or use Scribbletune's chord generator.

```
var scribble = require('../');

var clip = scribble.clip({
	notes: [
		'c3e3g3',
		scribble.chord('f', 'minor', 3),
		scribble.chord('g', 'major', 3)
	],
	pattern: 'x_x_x_x_x_x_x_x_',
	sizzle: true    // this will add a rhythmic accent to the generated notes
});

scribble.render(clip);
```

### Note

You will need an application like Ableton Live or Reason or Garage Band to use the generated MIDI file. The file will be generated in the same directory as `music.mid`
