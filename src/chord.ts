import { Chord, ChordType, Note } from '@tonaljs/tonal';
import { flat, isNote } from './utils';

const chordTypes = ChordType.all();
const chordNames = flat(chordTypes.map(t => t.aliases.concat([t.name]))).filter(
  Boolean
);

/**
 * Derive a chord from the given string. Exposed as simply `chord` in Scribbletune
 * @return {Array}     [example `chord('CM')` outputs: ['c4', 'e4', 'g4'], `chord('CM-5')` outputs: ['c5', 'e5', 'g5']]
 */
export const getChord = (
  name: string
): (string[] | null) | (null | string)[] => {
  if (isNote(name)) {
    throw new Error(`${name} is not a chord!`);
  }

  // Separate the octave from the chord
  const spl: string[] = name.split('-'); // e.g. CMaj7-4 => ['CMaj7', '4'];

  // tonal doesnt recognize 5 and below in the `tokenize` method,
  // hence explicitly massage those out
  const tokenizedName: string[] = Chord.tokenize(spl[0]); // e.g. ['C', 'Maj7']

  let root: string = tokenizedName[0];
  let chordName: string = tokenizedName[1];

  if (root[1] === '4' || root[1] === '5') {
    chordName = root[1];
    root = root.replace(/\d/, '');
  }

  // Since chords like C5 can also qualify for the note C5,
  // Scribbletune treats such chords with the `th` appended to it
  const numericalChords: NVP<string> = {
    '4th': '4',
    '5th': '5',
    '7th': '7',
    '9th': '9',
    '11th': '11',
    '13th': '13',
  };

  if (numericalChords[chordName]) {
    chordName = numericalChords[chordName];
  }

  if (!ChordType.get(chordName)) {
    throw new TypeError('Invalid chord name: ' + chordName);
  }

  const chord = Chord.get(root + chordName);
  const rootInOctave = root + (spl[1] || 4);
  return (chord.intervals || []).map(interval => {
    const note = Note.transpose(rootInOctave, interval);
    return Note.simplify(note as string);
  });
};

/**
 * Get a list of chords available in Scribbletune.
 * @return {Array}     [example output: ['maj', 'min', 'dim']]
 */
export const chords = (): string[] => {
  // Since chords like C5 can also qualify for the note C5,
  // Scribbletune treats such chords with the `th` appended to it
  const numericalChords: NVP<string> = {
    '4': '4th',
    '5': '5th',
    '7': '7th',
    '9': '9th',
    '11': '11th',
    '13': '13th',
  };

  return chordNames.map((c: string) => {
    if (/^\d+$/.test(c) && numericalChords[c]) {
      return numericalChords[c];
    } else {
      return c;
    }
  });
};

/**
 * Adds a chord to Tonal's chord collection, so getChord can access it.
 * @param  {<Array>String} intervals e.g. ['1P', '3M', '5P']
 * @param  {<Array>String} abbrev e.g. ['Q', 'T']
 * @param  {String} name e.g. full
 * @return {void}
 */
export const addChord = (
  intervals: string[],
  abbrev: string[],
  name?: string
): void => {
  ChordType.add(intervals, abbrev, name);
};
