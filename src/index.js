'use strict';
const scale = require('./mode');
const chord = require('./chord');
const clip = require('./clip');
const pattern = require('./pattern');
const midi = require('./midi');
const scales = require('./modes');
function setMiddle(octaveIndex){
    midi.setMiddle(octaveIndex);
    //Trans is the positive octave transposition
    //If trans is 1, all notes will be shifted up one octave
}
let modes = Object.keys(scales);

// Allow scale to be denoted by mode as well
module.exports = {mode: scale, scale, chord: chord.getChord, listChords: chord.listChords, modes, scales: modes, clip, pattern, midi: midi.midi, setMiddle};
