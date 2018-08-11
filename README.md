

Scribbletune
------------------------------------------------
[![Build Status](https://api.travis-ci.org/scribbletune/scribbletune.svg)](http://travis-ci.org/scribbletune/scribbletune)

Use simple __JavaScript__ `Strings` and `Arrays` to generate rhythms and musical patterns. Directly use the names of scales or chords in your code to get arrays which you can mash them up using JavaScript libraries like `underscore` or `lodash` in ways you hadn't imagined before! Create clips of musical ideas and export em as MIDI files which you can import in Ableton Live, Reason, Fruity Loops, Cubase, Garage Band or any music creation software that accepts MIDI files.

### Install

```bash
npm install scribbletune
```

#### Let's C how this works
You can get started by requiring the `scribbletune` module and create a `clip` that contains just the middle C note. A clip is like a container for a musical idea. It can be of any length.

```js
const scribble = require('scribbletune');
var clip = scribble.clip({
    notes: 'c4'
});
scribble.midi(clip);
```

Save this file as _c.js_ and run it from the terminal with `node c.js`. This will create a file called _music.mid_ at the same location as the _c.js_ file. If you import the MIDI file into your favorite MIDI music editing software (Garage Band / Cubase / Ableton Live / Reason etc), you'll hear the same middle C played across a single bar.

Scribbletune uses the [jsmidgen node module](https://github.com/dingram/jsmidgen) for exporting your creations to MIDI files. In fact, _jsmidgen_ is one of the original motivations for making Scribbletune a Node module (I ve tried doing this with Python in the past - there is no limit in Python or for that matter any other language but when you also want to [support browsers](https://github.com/scribbletune/scribbletune.js), then pretty much JavaScript is the only way forward).

### Create a simple melody

You can do more than render a single note! You can `require` the scribbletune module and use it to generate scales(modes), chords and patterns to create melodies. For example, to create a MIDI file comprising just the C Major scale (Ionian mode), you could create a new file and add some code like this:

```js
const scribble = require('scribbletune');

var clip = scribble.clip({
    notes: scribble.scale('C4 major'),
	pattern: 'x'.repeat(7) // 7 notes will be created
});

// OR export a midi file by saving this JS as cscale.js and run node cscale.js from its location in the terminal
scribble.midi(clip, 'cscale.mid');
```

[Click here to listen how that would sound](https://soundcloud.com/walmik/c-major)

Scribbletune depends on [Tonal](https://github.com/danigb/tonal) for generating scales and chords. Initially Scribbletune had it's own functionality to generate this. To stay in tune with the ideals of open source software, now it's delegated entirely to Tonal as this is a library that is dedicated to do just that. 

To get a list of all the modes and scales that Tonal provides, you can do this,

```js
const scribble = require('scribbletune');
console.log(scribble.scales());
```

### Chords

You might wonder, why can't I just use Tonal directly? Of course you can! But Scribbletune provides some sugar on top of it so that you can directly add chords to the `notes` property while creating a clip to render chord progressions.

```js
const scribble = require('scribbletune');
let chords = scribble.clip({
	notes: 'F#m C#m DM Bm EM AM DM C#m AM',
	pattern: '[xx][x-]'.repeat(8),
	sizzle: true
});  

scribble.midi(chords, 'chords.mid');
```

Since I used the `midi` method, I could generate a MIDI file that I then imported into Garage Band and applied Synthesizer->EDM Chord->Sunrise Chords to it and here is how it sounds.

[Click here to listen how that turned out](https://soundcloud.com/walmik/chords)

As you can see, you need to use the short chord symbols for naming chords... for e.g. major is denoted by `M`, minor chords by `m`, major seventh chords as `M7` and so on. To get a list of all the chords that Tonal can generate (and you can use em in Scribbletune), do this:

```js
const scribble = require('scribbletune');
console.log(scribble.chords());	// [ 'M', 'm', 'sus2', 'sus4', 'M7', 'm7', '7', '+', '6' ... ]
```

### Patterns

You may wonder what are those weird looking, but enticing `x`, `-` and `_`. Well, those are patterns! `x` means _note on_, `-` (hyphen) means `note off` and `_` (underscore) means _sustain_. The square braces are used to subdivide the pattern. So `[xx]` plays in the same duration as `x`. The idea of using `x`, `-` and `_` is native to Scribbletune but this method for subdividing patterns comes from the brilliant [Tone.js](https://tonejs.github.io/) library which in turn used inspiration from the brilliant [TidalCycles](https://tidalcycles.org/) language for live coding patterns! It's embeded into Haskell. In short, these simple patterns can be used to tell Scribbletune which beat should be `on` or `off` or `sustained`. Patterns can also be used to create accent maps (which allow some notes to be played louder than others).

### Create a simple beat
With the `String.repeat` function of JavaScript, you can quickly generate interesting patterns for note on/off as well as accent maps. For instance,

```js
let pattern = 'x'.repeat(4); // same as xxxx
```

What can you use that pattern for? Well, it looks like a standard 4 by 4 kick drum pattern to me! What about this,

```js
let pattern = '[-x]'.repeat(4); // same as [-x][-x][-x][-x]
```

Hmmm, that can be a very simple bass line for a simple dance music loop. Here's a rendered version of using that with a kick drum, bass and hats sample [loop](https://soundcloud.com/walmik/loop).

### Progressions
You must have seen or known about common chord progressions which look like I IV V ii. For the C Major scale, that means the following chords:
- CMaj
- FMaj
- GMaj
- Dm

With the new experimental feature `progression` you can get this with Scribbletune:

```js
let prog = scribble.progression('C4 major', 'I IV V ii');
console.log(prog); // CMaj-4 FMaj-4 GMaj-4 Dm-4
```

Hmmmm, what can you do with that? Well one thing is it can help in your song writing process to improve your existing songs or transpose its key. The other is to use it in Scribbletune itself!

```js
const scribble = require('../src/');

let clip = scribble.clip({
	notes: scribble.progression('D4 minor', 'I IV V ii'),
	pattern: 'x_'.repeat(4)
});

scribble.midi(clip);
```
This will create a MIDI file with those chords each played for half note!

There's a lot more to this humble beginning. But I'll let you explore it for yourself. As you can see, now you can use basic JavaScript `String` and `Array` functions to compute melodies using Scribbletune!

Ok then, get on with it ;).

```
npm install scribbletune
```
