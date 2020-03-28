import { getScale } from './scale';
import { pickOne, dice } from './utils';

/**
 * Get the chords that go with a given scale/mode
 * This is useful only in case you want to check what chords work with a scale/mode
 * so that you can come up with chord progressions
 * @param  {String} mode e.g. major
 * @return {Array} e.g.['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°']
 */
export const getChordDegrees = (mode: string) => {
  const theRomans: NVP<string[]> = {
    ionian: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
    dorian: ['i', 'ii', 'III', 'IV', 'v', 'vi°', 'VII'],
    phrygian: ['i', 'II', 'III', 'iv', 'v°', 'VI', 'vii'],
    lydian: ['I', 'II', 'iii', 'iv°', 'V', 'vi', 'vii'],
    mixolydian: ['I', 'ii', 'iii°', 'IV', 'v', 'vi', 'VII'],
    aeolian: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
    locrian: ['i°', 'II', 'iii', 'iv', 'V', 'VI', 'vii'],
    'melodic minor': ['i', 'ii', 'III+', 'IV', 'V', 'vi°', 'vii°'],
    'harmonic minor': ['i', 'ii°', 'III+', 'iv', 'V', 'VI', 'vii°'],
  };
  theRomans.major = theRomans.ionian;
  theRomans.minor = theRomans.aeolian;

  return theRomans[mode] || [];
};

const idxByDegree: NVP<number> = {
  i: 0,
  ii: 1,
  iii: 2,
  iv: 3,
  v: 4,
  vi: 5,
  vii: 6,
};

/**
 * Get a chord name from degree
 * @param  {String} roman e.g. ii OR ii° OR V7
 * @return {String} e.g. m OR m7b5 OR Maj7
 */
const getChordName = (roman: string): string => {
  // remove any non character
  const str = roman.replace(/\W/g, '');
  let prefix = 'M';
  // check if it s lowercase
  if (str.toLowerCase() === str) {
    prefix = 'm';
  }
  if (roman.indexOf('°') > -1) {
    return prefix + '7b5';
  }
  if (roman.indexOf('+') > -1) {
    return prefix + '#5';
  }

  if (roman.indexOf('7') > -1) {
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
export const getChordsByProgression = (
  noteOctaveScale: string,
  chordDegress: string
): string => {
  // Set the octave if missing
  // For example if the method was called with `C major` instead of `C4 major`, then add the 4
  const noteOctaveScaleArr = noteOctaveScale.split(' ');
  if (!noteOctaveScaleArr[0].match(/\d/)) {
    noteOctaveScaleArr[0] += '4';
    noteOctaveScale = noteOctaveScaleArr.join(' ');
  }

  // Get the scale from the given note and scale/mode combination
  const mode = getScale(noteOctaveScale);
  const chordDegreesArr = chordDegress.replace(/\s*,+\s*/g, ' ').split(' ');
  // Now we have something like ['i', 'ii', 'IV']
  // Convert it to a chord family such as ['Cm', 'Dm', 'FM']
  const chordFamily = chordDegreesArr.map((roman, idx) => {
    const chordName = getChordName(roman); // e.g. m
    // get the index to be used by removing any digit or non alphabet character
    const scaleId = idxByDegree[roman.replace(/\W|\d/g, '').toLowerCase()]; // e.g. 0
    // get the note itself
    const note = mode[scaleId] as string; // e.g. C
    // get the octave of the note;
    const oct = note.replace(/\D+/, ''); // e.g. 4
    // now get the chord
    return note.replace(/\d/, '') + chordName + '-' + oct;
  });

  return chordFamily.toString().replace(/,/g, ' ');
};

const getProgFactory = ({ T, P, D }: TPD) => {
  return (count: number = 4) => {
    const chords = [];

    // Push root/tonic
    chords.push(pickOne(T));

    let i = 1;

    // Pick a predominant
    if (i < count - 1) {
      chords.push(pickOne(P));
      i++;
    }

    // Try another predominant
    if (i < count - 1 && dice()) {
      chords.push(pickOne(P));
      i++;
    }

    ///////// 4 or more//////////
    if (i < count - 1) {
      // Pick a dominant
      chords.push(pickOne(D));
      i++;
    }

    if (i < count - 1) {
      // Pick a predominant
      chords.push(pickOne(P));
      i++;
    }

    if (i < count - 1) {
      // Pick a dominant
      chords.push(pickOne(D));
      i++;
    }

    // Pick a predominant if possible
    if (i < count - 1 && dice()) {
      chords.push(pickOne(P));
      i++;
    }
    ////////////////////////////

    // Fill the rest with dominant
    while (i < count) {
      chords.push(pickOne(D));
      i++;
    }

    return chords;
  };
};

const M = getProgFactory({ T: ['I', 'vi'], P: ['ii', 'IV'], D: ['V'] });
const m = getProgFactory({ T: ['i', 'VI'], P: ['ii', 'iv'], D: ['V'] });

/**
 * Generate a chord progression based on basic music theory
 * where we follow tonic to optionally predominant and then dominant
 * and then randomly to predominant and continue this till we reach `count`
 * @param scale e.g. M (for major chord progression), m (for minor chord progression)
 * @param count e.g. 4
 */
export const progression = (scale: progressionScale, count: number = 4) => {
  if (scale === 'major' || scale === 'M') {
    return M(count);
  }

  if (scale === 'minor' || scale === 'm') {
    return m(count);
  }
};
