Scribbletune (Requires Node 4+)
------------------------------------------------
[![Build Status](https://api.travis-ci.org/walmik/scribbletune.svg)](http://travis-ci.org/walmik/scribbletune)

Use simple __JavaScript__ `Strings` and `Arrays` to generate rhythms and musical patterns. Directly use the names of scales and chords and mash them up using JavaScript libraries like `underscore` or `lodash` in ways you hadn't imagined before! Then, export them as MIDI files and import these in Ableton Live, Reason, Fruity Loops, Cubase, Garage Band or whichever music creation software you like!

### Install

`npm install scribbletune`

### Let's C how this works
You can get started by requiring the `scribbletune` module and create a `clip` that contains just the middle C note. A clip is like a 16 beat bar.
```js
const scribble = require('scribbletune');
let clip = scribble.clip({
    notes: ['c4']
});
scribble.midi(clip);
```
Save this file as _c.js_ and run it from the terminal with `node c.js`. This will create a file called _music.mid_ at the same location as the _c.js_ file. If you import the MIDI file into your favorite MIDI music editing software (Garage Band / Cubase / Ableton Live / Reason etc), you ll hear the beautiful middle C played across a single bar.

### Create a simple melody
You can do more than render a single note! You can `require` the scribbletune module and use it to generate scales(modes), chords and patterns to create melodies. For example, to create a MIDI file comprising just the C Major scale (Ionian mode), you could create a new file and add some code like this:
```js
const scribble = require('scribbletune');

let clip = scribble.clip({
    notes: scribble.scale('c', 'major', 3), // this works too ['c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3']
	pattern: 'x-'.repeat(8)
});

scribble.midi(clip, 'cscale.mid');
```
Save this as _cscale.js_ and run it from the terminal `node cscale.js`. This will create a MIDI file called _cscale.mid_ in the same location as the above file.

[C Major Scale generated with Scribbletune](https://soundcloud.com/walmik/c-major) 

To get a list of all the modes and scales that Scribbletune can generate, you can do this,
```js
const scribble = require('scribbletune');
console.log(scribble.scales);
```
Here is a [list of modes and scales](https://github.com/walmik/scribbletune/blob/master/src/modes.js) that Scribbletune recognizes.

### Chords

You can add chords to the `notes` array while creating a clip to render chords. Either provide the notes (with octave) of the chords you want separated by commas or use Scribbletune's chord generator.

```js
const scribble = require('scribbletune');
let chords = scribble.clip({
	notes: ['F#min', 'C#min', 'Dmaj', 'Bmin', 'Emaj', 'Amaj', 'Dmaj', 'C#min', 'Amaj'],
	pattern: 'x_x_x_--'.repeat(8),
	sizzle: true
});  

scribble.midi(chords, 'chords.mid');
```

I imported that into Garage Band and applied Synthesize -> EDM Chord ->Sunrise Chords to it and here is how it sounds:

[Chords generated with Scribbletune](https://soundcloud.com/walmik/chords) 

To get a list of all the chords that Scribbletune can generate, you can do this,
```js
const scribble = require('scribbletune');
console.log(scribble.listChords());	// [ 'maj', 'min', 'sus2', 'sus4', 'maj7', 'min7', 'dom7', 'dim', 'dim7', 'aug', 'sixth']
```

### Patterns

You may wonder what are those weird looking, but enticing `x`, `-` and `_`. Well, those are patterns! `x` means _note on_, `-` (hyphen) means `note off` and `_` (underscore) means _sustain_. Patterns can be used to tell Scribble tune which beat in a 16 beat pattern would you like to be on or off or sustained. Patterns can also be used to create accent maps (which allow some notes to be played louder than others).

### Create a simple beat
With the new String.repeat function, you can quickly generate interesting patterns for note on/off as well as accent maps. For instance,

```js
let pattern = 'x---'.repeat(4);
```
That will return,
```
x---x---x---x---
```

What can you use that pattern for? Well, it looks like a standard 4 by 4 kick drum pattern to me! What about this:
```js
let pattern = '--x-'.repeat(4);
```
That will return,
```
--x---x---x---x-
```
Hmmm, that can be a very simple bass line for a simple dance music loop. Let's feed that into __Scribbletune's__ clip function and try something different while generating the notes, shall we?

### An excessively simple Kick Drum and Bass loop

```js
const scribble = require('scribbletune');
let kick, bass;

// 4 by 4 kick
kick = scribble.clip({
	notes: ['c2'],
	pattern: 'x---'.repeat(4)
});
scribble.midi(kick, 'kick.mid');

// A simple bass line
bass = scribble.clip({
	notes: scribble.scale('a', 'minor', 2).slice(0, 3),
	pattern: '--x-'.repeat(4),
	shuffle: true
});
scribble.midi(bass, 'bass.mid');
```
Up there, we first created a 4 by 4 kick drum loop and then decided to use the first 3 notes of a _A minor_ scale on the second octave to create a simple bass line. We created a simple pattern using __JavaScript's__ `String.repeat` and then added the `shuffle` parameter to shuffle those 3 notes. Finally, we exported it as a MIDI file called _bass.mid_

### High Hats
Let s just take this one teeny weeny step further and create a simple hi hats loop as well,

```js
const scribble = require('scribbletune');

let hats = scribble.clip({
	notes: ['c4'],
	pattern: 'x'.repeat(16),
	accentMap: 'x---x---x-x---x-'
});

scribble.midi(hats, 'hats.mid');
```
Here we created a 16 beat bar with all its 16 notes set to `x` (which means _Note On_) and added a `sizzle` to it. This applies a `Math.Sin` wave to the accents on that clip, giving it a bouncier feel.

Import the 3 MIDI files thus generated into your favorite music creation software and add them to 3 different tracks. I used Garage Band and added some delay on the bass and here's what I got:

[Simple kick drum with bass and some hats generated by Scribbletune](https://soundcloud.com/walmik/loop) 

There's a lot more to this humble beginning. But I ll let you explore it for yourself. As you can see, now you can use any JavaScript library (or not) to compute melodies using Scribbletune! Ok then, get on with it :)

```
npm install scribbletune
```
