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
export const shuffle = (arr: any[], fullShuffle: boolean = true): string[] => {
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
    let rnd
    rnd  = fullShuffle
      ? Math.floor(Math.random() * (lastIndex - idx) ) + 1 + idx
      // Pick random number from idx+1 to lastIndex (Modified algorithm, (N-1)! combinations)
      // Math.random -> [0, 1) -> [0, lastIndex-idx ) --floor-> [0, lastIndex-idx-1]
      // rnd = [0, lastIndex-idx-1] + 1 + idx = [1 + idx, lastIndex]
      // (Original algorithm would pick rnd = [idx, lastIndex], thus any element could arrive back into its slot)
  
      : Math.floor(Math.random() * (lastIndex + 1 - idx) ) + idx
      // Pick random number from idx to lastIndex (Unmodified Richard Durstenfeld, N! combinations)
    ;
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
export const sizzleMap = (maxLevel: number = 127): number[] => {
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
export const pickOne = (arr: any[]) =>
  arr.length > 1 ? arr[Math.round(Math.random())] : arr[0];

/**
 * Boolean generator
 */
export const dice = () => !!Math.round(Math.random());

/**
 * Polyfill for Array.prototype.flat
 */
export const flat = (arr: any[][]) =>
  arr.reduce((acc, val) => acc.concat(val), []);
