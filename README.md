## <img width=2% src="https://scribbletune.com/images/scribbletune-logo.png"> SCRIBBLETUNE

[![Build Status](https://travis-ci.com/scribbletune/scribbletune.svg?branch=master)](http://travis-ci.com/scribbletune/scribbletune)
[![Try scribbletune on RunKit](https://badge.runkitcdn.com/scribbletune.svg)](https://npm.runkit.com/scribbletune)

Use simple **JavaScript** `Strings` and `Arrays` to generate rhythms and musical patterns. Directly use the names of scales or chords in your code to get arrays which you can mash up using Array methods in ways you hadn't imagined before! Create clips of musical ideas and **export MIDI files** which you can import in _Ableton Live, Reason, GarageBand_ or any music creation software that accepts MIDI files.

### Install

```bash
npm install scribbletune
```

### Use it to create a MIDI clip by running a JS file from your terminal using node.js
```javascript
const scribble = require('scribbletune');
const clip = scribble.clip({
    notes: scribble.scale('C4 major'),
    pattern: 'x'.repeat(7) + '_'
});

scribble.midi(clip, 'c-major.mid');
```


You can use Scribbletune even **in the browser** with Tone.js!. There are a couple of ways to do this. A quick and dirty way is to make sure to pull in [Tone.js](https://cdnjs.com/libraries/tone) followed by the [latest browser version of Scribbletune](https://cdnjs.com/libraries/scribbletune).

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/<LATEST-VERSION-FROM-CDNJS>/Tone.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/scribbletune/<LATEST-VERSION-FROM-CDNJS>/scribbletune.js"></script>
```

This will expose a global object called `scribble` which you can directly use to run the methods from Scribbletune in conjunction with Tone.js

The recommended way for the browser, however, is to import it like this
```javascript
const scribble = require('scribbletune/browser');
```
This will provide the same API but augment it a bit to support browser based functionality.

Visit [scribbletune.com](https://scribbletune.com) for documentation, tutorials and examples! Listen to music generated with Scribbletune on [Soundcloud](https://soundcloud.com/scribbletune).
