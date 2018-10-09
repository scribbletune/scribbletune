'use strict';
const Tonal = require('tonal');
const chord = require('./chord').getChord;

/**
 * Get the chords that go with a given scale/mode
 * This is useful only in case you want to check what chords work with a scale/mode
 * so that you can come up with chord progressions
 * @param  {String} mode e.g. major
 * @return {Array} e.g.['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°']
 */
const get = mode => {
  const theRomans = {
    ionian: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
    dorian: ['i', 'ii', 'III', 'IV', 'v', 'vi°', 'VII'],
    phrygian: ['i', 'II', 'III', 'iv', 'v°', 'VI', 'vii'],
    lydian: ['I', 'II', 'iii', 'iv°', 'V', 'vi', 'vii'],
    mixolydian: ['I', 'ii', 'iii°', 'IV', 'v', 'vi', 'VII'],
    aeolian: ['I', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
    locrian: ['i°', 'II', 'iii', 'iv', 'V', 'VI', 'vii'],
    melodic: ['i', 'ii', 'III+', 'IV', 'V', 'vi°', 'vii°'],
    harmonic: ['i', 'ii°', 'III+', 'iv', 'V', 'VI', 'vii°']
  };
  theRomans.major = theRomans.ionian;
  theRomans.minor = theRomans.aeolian;

  return theRomans[mode] || [];
};

/**
 * Take an array and fill it with it s own elements in the next octave till it s of the specified `len`
 * @param  {Array} arr e.g. ['a4', 'b4']
 * @param  {Number} e.g. len 4
 * @return {Array} e.g. ['a4', 'b4', 'a5', 'b5']
 */
const fillArr = (arr, len) => {

  const bumpOctave = el => {
    let note = el.replace(/\d/, '');
    let oct = el.replace(/\D/g, '');
    return note + (+oct + 1);
  };

  // Create a couple of chord arrays with bumped octaves
  let arr1 = arr.map(bumpOctave);
  let arr2 = arr1.map(bumpOctave);
  let finalArr =  [...arr, ...arr1, ...arr2];

  // Slice and return only as much as required
  return finalArr.slice(0, len);
};

const idxByDegree = {
  'i': 0,
  'ii': 1,
  'iii': 2,
  'iv': 3,
  'v': 4,
  'vi': 5,
  'vii': 6
};

/**
 * Get a chord name from degree
 * @param  {String} roman e.g. ii OR ii° OR V7
 * @return {String} e.g. m OR m7b5 OR Maj7
 */
const getChordName = roman => {
  // remove any non character
  const str = roman.replace(/\W/g, '');
  let prefix = 'M';
  // check if it s lowercase
  if (str.toLowerCase() === str) {
    prefix = 'm';
  }
  if (roman.includes('°')) {
    return prefix + '7b5';
  }
  if (roman.includes('+')) {
    return prefix + '#5';
  }

  if (roman.includes('7')) {
    return prefix === 'M' ? 'Maj7' : 'm7';
  }

  return prefix;
};

/**
 * Take the specified scale and degrees and return the chord names for them
 * These can be used as the value for the `notes` param of the `clip` method
 * @param {String} noteOctaveScale e.g. 'C4 major'
 * @param  {String} chordDegress e.g. 'I IV V IV'
 * @return {String} e.g. 'CM FM GM FM'
 */
const getChords = (noteOctaveScale, chordDegress) => {
  // Set the octave if missing
  // For example if the method was called with `C major` instead of `C4 major`, then add the 4
  const noteOctaveScaleArr = noteOctaveScale.split(' ');
  if (!noteOctaveScaleArr[0].match(/\d/)) {
    noteOctaveScaleArr[0] += '4';
    noteOctaveScale = noteOctaveScaleArr.join(' ');
  }

  // Get the scale from the given note and scale/mode combination
  const mode = Tonal.Scale.notes(noteOctaveScale);
  const chordDegreesArr = chordDegress.replace(/\s*,+\s*/g, ' ').split(' ');
  // Now we have something like ['i', 'ii', 'IV']
  // Convert it to a chord family such as ['Cm', 'Dm', 'FM']
  const chordFamily = chordDegreesArr.map((roman, idx) => {
    const chordName = getChordName(roman); // e.g. m
    // get the index to be used by removing any digit or non alphabet character
    const scaleId = idxByDegree[roman.replace(/\W|\d/g, '').toLowerCase()]; // e.g. 0
    // get the note itself
    const note = mode[scaleId]; // e.g. C
    // get the octave of the note;
    const oct = note.replace(/\D+/, '');  // e.g. 4
    // now get the chord
    return note.replace(/\d/, '') + chordName + '-' + oct;
  });

  return chordFamily.toString().replace(/,/g, ' ');
};

const arpegiate = chordsOrParams => {
  let finalArr = [];
  let params = {
    count: 8,
    order: '01234567'
  };

  if (typeof chordsOrParams === 'string') {
    params.chords = chordsOrParams;
  } else {
    params = {...params, ...chordsOrParams}
  }

  if (params.count > 8 || params.count < 2) {
    throw Error('Invalid value for count');
  }

  if (params.order.match(/\D/g) || params.order.includes('8') || params.order.includes('9')) {
    throw Error('Invalid value for order');
  }

  let chordsArr = params.chords.split(' ');
  chordsArr.forEach(el => {
    let filledArr = fillArr(chord(el), params.count);
    // reorder the filledArr as per params.order
    let reorderedArr = params.order.split('').map(idx => filledArr[idx]);
    finalArr = [...finalArr, ...reorderedArr];
  });

  return finalArr;
};

module.exports = {
  get: get,
  getChords: getChords,
  arpegiate: arpegiate
};
