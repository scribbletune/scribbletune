

Scribbletune
------------------------------------------------
[![Build Status](https://api.travis-ci.org/walmik/scribbletune.svg)](http://travis-ci.org/walmik/scribbletune)

Use simple __JavaScript__ `Strings` and `Arrays` to generate rhythms and musical patterns. Directly use the names of scales or chords in your code to get arrays which you can mash them up using JavaScript libraries like `underscore` or `lodash` in ways you hadn't imagined before! Play the patterns _directly in the browser_ using Synths, Sample players and effects (all with easy to use Presets) or export them as MIDI files and import these in Ableton Live, Reason, Fruity Loops, Cubase, Garage Band or any music creation software that accepts MIDI files. You can even create your own version of an online music production app for the browser! 

### Install

To install the stable version (no browser suppport),

```bash
npm install scribbletune@0.11.2
```

To install the new still WIP version (with browser suppport via Tone.js),

```bash
npm install scribbletune
```

Internally Scribbletune depends on 3 other libraries ([Tone.js](https://tonejs.github.io/), [Tonal](https://github.com/danigb/tonal) and [jsmidgen](https://github.com/dingram/jsmidgen)) so technically you dont need to install anything other than Scribbletune itself. Use at least __Node 6+__ and __NPM 5.2+__ and in your project directory run, 

```bash
npm install scribbletune
```

#### Let's C how this works
You can get started by requiring the `scribbletune` module and create a `clip` that contains just the middle C note. A clip is like a container for a musical idea. It can be of any length.

```js
const scribble = require('scribbletune');
var clip = scribble.clip({
    notes: 'c4',
    synth: 'Synth'
});
scribble.transport.start();
clip.start();
```

Bundle up this script and run it in the browser to hear the sound of the beautiful middle C note emanating from your computer's speakers.

Scribbletune depends on the brilliant [Tone.js](https://github.com/dingram/jsmidgen) wrapper for the WebAudioAPI to play and sequence sounds right in the browser. The `tranport` that you see up there in the code snippet is basically [Tone.Transport](https://tonejs.github.io/docs/r12/Transport)! You might wonder why use Scribbletune then? Well, Scribbletune lets you define patterns with `x` and `-` that can help you setup sequences, synths and effects with presets quickly (and much fewer lines of code). It also provides the same interface for exporting sequences as MIDI files that music software such as Ableton Live, Properllerhead Reason and many others can make use of.

Make a small change to get a MIDI file instead,

```js
const scribble = require('scribbletune');
var clip = scribble.clip({
    notes: 'c4'
});
scribble.midi(clip);
```

Save this file as _c.js_ and run it from the terminal with `node c.js`. This will create a file called _music.mid_ at the same location as the _c.js_ file. If you import the MIDI file into your favorite MIDI music editing software (Garage Band / Cubase / Ableton Live / Reason etc), you'll hear the same middle C played across a single bar.

Scribbletune uses the [jsmidgen node module](https://github.com/dingram/jsmidgen) for exporting your creations to MIDI files. In fact, _jsmidgen_ is one of the original motivations for making Scribbletune a Node module (I ve tried doing this with Python in the past - there is no limit in Python or for that matter any other language but when you also want to support browsers, then pretty much JavaScript is the only way forward).

> As you can see, you used the same `clip` method to create it for the browser or to export as MIDI from the terminal!

### Create a simple melody
You can do more than render a single note! You can `require` the scribbletune module and use it to generate scales(modes), chords and patterns to create melodies. For example, to create a MIDI file comprising just the C Major scale (Ionian mode), you could create a new file and add some code like this:

```js
const scribble = require('scribbletune');

var clip = scribble.clip({
    notes: scribble.scale('C4 major'),
	pattern: 'x-'.repeat(8),
	synth: 'Synth'
});

scribble.transport.start();
clip.start();

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
Explore [scales](https://danigb.github.io/tonal-app/#/C/scales) and [chords](https://danigb.github.io/tonal-app/#/C/chords) available in Scribbletune thanks to Tonal!

### Chords

You might wonder, why can't I just use Tonal directly? Of course you can! But Scribbletune provides some sugar on top of it so that you can directly add chords to the `notes` property while creating a clip to render chord progressions.

```js
const scribble = require('scribbletune');
let chords = scribble.clip({
	notes: 'F#m C#m DM Bm EM AM DM C#m AM',
	pattern: 'x_x_x_--'.repeat(8),
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

You may wonder what are those weird looking, but enticing `x`, `-` and `_`. Well, those are patterns! `x` means _note on_, `-` (hyphen) means `note off` and `_` (underscore) means _sustain_. Patterns can be used to tell Scribble tune which beat in a pattern would you like to be on or off or sustained. Patterns can also be used to create accent maps (which allow some notes to be played louder than others).

### Create a simple beat
With the new `String.repeat` function, you can quickly generate interesting patterns for note on/off as well as accent maps. For instance,

```js
let pattern = 'x---'.repeat(4); // x---x---x---x---
```

What can you use that pattern for? Well, it looks like a standard 4 by 4 kick drum pattern to me! What about this,

```js
let pattern = '--x-'.repeat(4); // --x---x---x---x-
```

Hmmm, that can be a very simple bass line for a simple dance music loop. Let's feed that into Scribbletune's clip function and try something different while generating the notes, shall we?

#### An excessively simple Kick Drum, Bass and Hats loop right in the browser

Let's create a directory with the following structure:

```bash
root
	- index.html
	- main.js
	- kick.wav
	- bass.wav
	- hats.wav
```

As you can see we ve introduced 3 wav files here. You can download kick drum, bass and hats from various sites for free. For instance you could download them from [here](https://freewavesamples.com/). All we need is 3 samples that can be used for kick drum, bass and hats.

Assuming you ve already installed `scribbletune`, now install `browserify`,

```bash
npm install browserify
```

Open (or create) main.js and enter the following in it:

```js
const scribble = require('scribbletune');
scribble.transport.start(140);

scribble.clip({ sample: '/kick.wav', pattern: 'x' }).start();
scribble.clip({ sample: '/bass.wav', pattern: '[--xx]' }).start();
scribble.clip({ sample: '/hats.wav', pattern: '[-x]' }).start();
```

Up there, we first created a 4 by 4 kick drum loop and then a simple bass line and a hats loop. Using browserify, lets export this file to bundle.js. In the terminal (at the location of these files), run

```bash
npx browserify main.js -o bundle.js
```

Here we used something called `npx`. This lets us use modules such as grunt, webpack or browserify from their local install locations without needing to install the globally. I hate installing stuff globally! (Please note: `npx` is available only from `npm 5.2` onward)

In index.html, make sure you add `<script src="bundle.js"></script>` Finally, make sure you have a server that serves these files from your localhost. On a mac, you can quickly run a python HTTP server by running this in the terminal at the location of these files.

```bash
python -m SimpleHTTPServer
```

This will start a server on port 8000 and it will serve the files from the location this command was run from. Once you open your browser and load http://localhost:8000, [you should hear something like this looping over and over](https://soundcloud.com/walmik/loop).

There's a lot more to this humble beginning. But I'll let you explore it for yourself. As you can see, now you can use basic JavaScript `String` and `Array` functions to compute melodies using Scribbletune!

#### WIP development & documentation

This project and it's documentation is still largely work in progress (but you can use it to start making music today). Some additional documentation for the newly added functionality that can help you put together a Ableton Live like Session view, available Tone.js synths and effects with presets etc is [available here](https://github.com/walmik/scribbletune/wiki/Scribbletune-1.0.0-alpha.1-(new-changes-&-goals))

Ok then, get on with it ;).

```
npm install scribbletune
```
