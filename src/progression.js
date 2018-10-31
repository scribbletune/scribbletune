'use strict';
const scale = require('./scale').getScaleNotes;
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
    aeolian: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
    locrian: ['i°', 'II', 'iii', 'iv', 'V', 'VI', 'vii'],
    'melodic minor': ['i', 'ii', 'III+', 'IV', 'V', 'vi°', 'vii°'],
    'harmonic minor': ['i', 'ii°', 'III+', 'iv', 'V', 'VI', 'vii°']
  };
  theRomans.major = theRomans.ionian;
  theRomans.minor = theRomans.aeolian;

  return theRomans[mode] || [];
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
  const mode = scale(noteOctaveScale);
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

module.exports = {
  get: get,
  getChords: getChords
};
