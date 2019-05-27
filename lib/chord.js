"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tonal_1 = require("tonal");
const chordNames = tonal_1.Chord.names();
const utils_1 = require("./utils");
// Since chords like C5 can also qualify for the note C5,
// Scribbletune treats such chords with the `th` appended to it
const numericalChords = {
    '4th': '4',
    '5th': '5',
    '7th': '7',
    '9th': '9',
    '11th': '11',
    '13th': '13',
};
/**
 * Derive a chord from the given string. Exposed as simply `chord` in Scribbletune
 * @return {Array}     [example output: ['c4', 'e4', 'g4']]
 */
exports.getChord = (name) => {
    if (utils_1.isNote(name)) {
        throw new Error(`${name} is not a chord!`);
    }
    // Separate the octave from the chord
    const spl = name.split('-'); // e.g. CMaj7-4 => ['CMaj7', '4'];
    // tonal doesnt recognize 5 and below in the `tokenize` method,
    // hence explicitly massage those out
    const tokenizedName = tonal_1.Chord.tokenize(spl[0]); // e.g. ['C', 'Maj7']
    let root = tokenizedName[0];
    let chordName = tokenizedName[1];
    if (root[1] === '4' || root[1] === '5') {
        chordName = root[1];
        root = root.replace(/\d/, '');
    }
    if (numericalChords[chordName]) {
        chordName = numericalChords[chordName];
    }
    if (!tonal_1.Chord.exists(chordName)) {
        throw new TypeError('Invalid chord name: ' + chordName);
    }
    return (tonal_1.chord(chordName) || []).map(el => {
        const note = tonal_1.transpose.bind(null, root + (spl[1] || 4))(el);
        return tonal_1.Note.simplify(note);
    });
};
/**
 * Get a list of chords available in Scribbletune.
 * @return {Array}     [example output: ['maj', 'min', 'dim']]
 */
exports.chords = () => {
    return chordNames.map(c => {
        if (/^\d+$/.test(c) && numericalChords[c]) {
            return numericalChords[c];
        }
        else {
            return c;
        }
    });
};
