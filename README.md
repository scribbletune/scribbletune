Scribbletune (WIP)
------------------

Generate musical patterns with JavaScript and export as MIDI files using node.js 
[![Build Status](https://api.travis-ci.org/walmik/scribbletune.svg)](http://travis-ci.org/walmik/scribbletune)

### Install

`npm install scribbletune`

### Let's C how this work
You can get started by requiring the `scribbletune` module and create a `clip` that contains just the middle C note. A clip is like a 16 beat bar.
```
var scribble = require('scribbletune');
var clip = scribble.clip({
    notes: ['c3']
});
scribble.render(clip);
```
Save this file as _c.js_ and run it from the terminal with `node c.js`. This will create a file called _music.mid_ at the same location as the _c.js_ file. If you import the MIDI file into your favorite MIDI music editing software (Garage Band / Cubase / Ableton Live / Reason etc), you ll hear the beautiful middle C played across a single bar.

### Create a simple melody
You can do more than render a single note. You can `require` the scribbletune module and use it to generate scales(modes), chords and patterns to create melodies. For example, to create a MIDI file comprising just the C Major scale (Ionian mode), you could create a new file and add some code like this:
```
var scribble = require('scribbletune');

var clip = scribble.clip({
    notes: scribble.scale('c', 'major', 3), // this works too ['c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3']
	pattern: 'x_x_x_x_x_x_x_x_'
});

scribble.render(clip, 'cscale.mid');
```
Save this as _cscale.js_ and run it from the terminal `node cscale.js`. This will create a MIDI file called _cscale.mid_ in the same location as the above file.

### Chords

You can add chords to the `notes` array while creating a clip to render chords. Either provide the notes (with octave) of the chords you want separated by commas or use Scribbletune's chord generator.

```
var scribble = require('../');

var clip = scribble.clip({
	notes: [
		'c3,e3,g3',
		scribble.chord('f', 'minor', 3),
		scribble.chord('g', 'major', 3)
	],
	pattern: 'x_x_x_x_x_x_x_x_',
	sizzle: true    // this will add a rhythmic accent to the generated notes
});

scribble.render(clip);
```

### Patterns

You may wonder what are those weird looking, but enticing `x`, `-` and `_`. Well, those are patterns! `x` means _note on_, `-` (hyphen) means `note off` and `_` (underscore) means _sustain_. Patterns can be used to tell Scribble tune which beat in a 16 beat pattern would you like to be on or off or sustained. Patterns can also be used to create accent maps (which allow some notes to be played louder than others).

As you can clearly see, now you can use any JavaScript library that works on Collections, such as `underscore` or `lodash` and compute melodies using Scribbletune! Ok then, get on with it :)
