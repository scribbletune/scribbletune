import { chord, inlineChord } from 'harmonics';

/**
 * Helper for bracket notation object property access
 */
export interface IIndexable<T = any> {
  [key: string]: T;
}

/**
 * Take a string input and check if it s a note name or not
 * @param  {String} str Note name e.g. c4
 * @return {Boolean} Return true for c4 or return false for something like CM
 */
export const isNote = (str: string): boolean =>
  /^[a-gA-G](?:#|b)?\d$/.test(str);

/**
 * Take a String input such as xxx[xx[xx]]
 * and return an Array as ['x', 'x', 'x', ['x', 'x', ['x', 'x']]]
 * @param  {String} str
 * @return {Array}
 */
export const expandStr = (str: string): any => {
  str = JSON.stringify(str.split(''));
  str = str.replace(/,"\[",/g, ', [');
  str = str.replace(/"\[",/g, '[');
  str = str.replace(/,"\]"/g, ']');
  return JSON.parse(str);
};

/**
 * Basic Array randomizer
 * @param  {Array} arr
 * @param  {boolean} fullShuffle Ensure no elements remain in old place
 * @return {Array}
 */
export const shuffle = (arr: any[], fullShuffle = true): string[] => {
  const lastIndex: number = arr.length - 1;

  // Shuffle algorithm by Richard Durstenfeld (Donald E. Knuth), also Ronald Fisher and Frank Yates.
  // "Full Shuffle" Modification to ensure no elements remain in their original place (by taking each element once
  // and swapping with any remaining elements)
  arr.forEach((el, idx: number) => {
    if (idx >= lastIndex) {
      // No shuffling last element
      // One before last is always swapped with last at the end of the loop
      // Since previous swaps can move last element into other places, there is still a random shuffle of last element
      return;
    }
    // Swap el with one of the higher elements randomly
    const rnd = fullShuffle
      ? // Pick random number from idx+1 to lastIndex (Modified algorithm, (N-1)! combinations)
        // Math.random -> [0, 1) -> [0, lastIndex-idx ) --floor-> [0, lastIndex-idx-1]
        // rnd = [0, lastIndex-idx-1] + 1 + idx = [1 + idx, lastIndex]
        // (Original algorithm would pick rnd = [idx, lastIndex], thus any element could arrive back into its slot)
        Math.floor(Math.random() * (lastIndex - idx)) + 1 + idx
      : // Pick random number from idx to lastIndex (Unmodified Richard Durstenfeld, N! combinations)
        Math.floor(Math.random() * (lastIndex + 1 - idx)) + idx;
    arr[idx] = arr[rnd];
    arr[rnd] = el;
  });

  return arr;
};

/**
 * Return an array of numbers relative to maxLevel || 127 ordered in a Sine wave format
 * This is used by the `sizzle` param of the `clip` method to add a rudimentary variation to the accent of each note
 * @param {Number} maxLevel A number between not more than 127
 * @return {Array}  Example output [63, 90, 110, 127, 110, 90, 63, 0, 63, 90, 110, 127, 110, 90, 63, 0]
 */
export const sizzleMap = (maxLevel = 127): number[] => {
  const pi = Math.PI;
  const piArr: number[] = [
    pi / 6,
    pi / 4,
    pi / 3,
    pi / 2,
    (2 * pi) / 3,
    (3 * pi) / 4,
    (5 * pi) / 6,
    pi,
  ];
  const piArrRev: number[] = [
    0,
    pi / 6,
    pi / 4,
    pi / 3,
    pi / 2,
    (2 * pi) / 3,
    (3 * pi) / 4,
    (5 * pi) / 6,
  ];
  piArrRev.reverse();
  const arr: number[] = piArr.concat(piArrRev);
  return arr.map(element => Math.round(Math.sin(element) * maxLevel));
};

/**
 * Pick one item randomly from an array and return it
 * @param arr
 */
export const pickOne = (arr: any[]): any =>
  arr.length > 1 ? arr[Math.round(Math.random())] : arr[0];

/**
 * Boolean generator
 */
export const dice = (): boolean => !!Math.round(Math.random());

/**
 * Polyfill for Array.prototype.flat
 */
export const flat = (arr: any[][]): any[] =>
  arr.reduce((acc, val) => acc.concat(val), []);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const errorHasMessage = (x: any): x is { message: string } => {
  return typeof x.message === 'string';
};

/**
 *  'el' could be an inlineChord() e.g. Cmaj7 or Dbsus2_5
 *  or a chord() e.g. 'C3 M'
 */
export const convertChordToNotes = (el: string): string[] => {
  // Try both inlineChord() and chord()
  let c1;
  let c2;
  let e1;
  let e2;
  try {
    c1 = inlineChord(el);
  } catch (e) {
    e1 = e;
  }
  try {
    c2 = chord(el.replace(/_/g, ' ')); // chord() is not friendly to underscores
  } catch (e) {
    e2 = e;
  }

  if (!e1 && !e2) {
    // Both inlineChord() and chord() have result
    if (c1.toString() !== c2.toString()) {
      throw new Error(`Chord ${el} cannot decode, guessing ${c1} or ${c2}`);
    }
    return c1;
  } // else
  if (!e1) {
    return c1;
  } // else
  if (!e2) {
    return c2;
  } // else

  // Give up, last try:
  return chord(el);
};

export const convertChordsToNotes = (
  el: string | (string | string[])[]
): string[] => {
  if (typeof el === 'string' && isNote(el as string)) {
    // A note needs to be an array so that it can accomodate chords or single notes with a single interface
    return [el];
  }

  if (Array.isArray(el)) {
    // This could be a chord provided as an array or an array of arrays
    el.forEach(n => {
      // This could be a chord provided as an array
      if (Array.isArray(n)) {
        // TODO: Can we convert it to something useful?
        // make sure it uses valid notes
        n.forEach(n1 => {
          if (typeof n1 !== 'string' || !isNote(n1)) {
            throw new TypeError('array of arrays must comprise valid notes');
          }
        });
        // throw new TypeError('cannot decode array of arrays');
      } else if (typeof n !== 'string' || !isNote(n)) {
        // make sure it uses valid notes
        throw new TypeError('array must comprise valid notes');
      }
    });

    return el as string[];
    // ? return el as (string | string[])[];
  }

  if (!Array.isArray(el)) {
    const c = convertChordToNotes(el);
    if (c && c.length) {
      return c;
    }
  }

  throw new Error(`Chord ${el} not found`);
};

export const randomInt = (num = 1): number => Math.round(Math.random() * num);
