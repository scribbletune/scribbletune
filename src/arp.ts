import { inlineChord } from 'harmonics';
import { errorHasMessage } from './utils';

const DEFAULT_OCTAVE = 4;

/**
 * Take an array and fill it with it s own elements in the next octave till it s of the specified `len`
 * @param  {Array} arr e.g. ['a4', 'b4']
 * @param  {Number} e.g. len 4
 * @return {Array} e.g. ['a4', 'b4', 'a5', 'b5']
 */
const fillArr = (arr: string[], len: number) => {
  const bumpOctave = (el: string): string => {
    if (!el) {
      throw new Error('Empty element');
    }
    const note = el.replace(/\d/, '');
    const oct = el.replace(/\D/g, '') || DEFAULT_OCTAVE;
    if (!note) {
      throw new Error('Incorrect note');
    }
    return note + (+oct + 1);
  };

  // Create a couple of chord arrays with bumped octaves
  // so that something like [c3, e3, g4] turns into [c4, e4, g5] and [c5, e5, g6]
  const arr1 = arr.map(bumpOctave);
  const arr2 = arr1.map(bumpOctave);
  const finalArr = [...arr, ...arr1, ...arr2];

  // Slice and return only as much as required
  return finalArr.slice(0, len);
};

type Params = {
  count: number;
  order?: string;
  chords: string | any[];
};

/**
 *
 * @param chordsOrParams a string that denotes space (comma?) separated chords to be used or an object with additional properties
 * By default, if this is a string, the count of notes generated is 8 and the order is ascending.
 * For instance arp('CM FM') will result in an array of notes [C4, E4, G4, F4, A4, C4, C5, E5]
 * You can even provide Params as an object.
 * For e.g. arp({count: 8, order: '10325476', chords: 'FM_4 Gm7b5_4 AbM_4 Bbm_4 Cm_5 DbM_5 EbM_5})
 */
export const arp = (chordsOrParams: string | Params): any[] => {
  let finalArr: any[] = [];
  const params: Params = {
    count: 4,
    order: '0123',
    chords: '',
  };

  if (typeof chordsOrParams === 'string') {
    params.chords = chordsOrParams;
  } else {
    if (chordsOrParams.order && chordsOrParams.order.match(/\D/g)) {
      throw new TypeError('Invalid value for order');
    }

    if (chordsOrParams.count > 8 || chordsOrParams.count < 2) {
      throw new TypeError('Invalid value for count');
    }

    // Provision a order for the notes in case only count was provided
    if (chordsOrParams.count && !chordsOrParams.order) {
      params.order = Array.from(Array(chordsOrParams.count).keys()).join('');
    }
    Object.assign(params, chordsOrParams);
  }

  // Chords can be passed as a string, e.g. 'CM_4 FM_4'
  // or as an array of notes arrays e.g. [['C3', 'E3', 'G3', 'B3'], ['F3', 'A3', 'C4', 'E4']]
  if (typeof params.chords === 'string') {
    const chordsArr: string[] = params.chords.split(' ');
    chordsArr.forEach((c, i) => {
      try {
        const filledArr = fillArr(inlineChord(c), params.count);
        // reorder the filledArr as per params.order
        const reorderedArr = (params.order as string)
          .split('')
          .map((idx: any) => filledArr[idx]);
        finalArr = [...finalArr, ...reorderedArr];
      } catch (e) {
        throw new Error(
          `Cannot decode chord ${i + 1} "${c}" in given "${params.chords}"`
        );
      }
    });
  } else if (Array.isArray(params.chords)) {
    params.chords.forEach((c, i) => {
      try {
        const filledArr = fillArr(c as string[], params.count);
        // reorder the filledArr as per params.order
        const reorderedArr = (params.order as string)
          .split('')
          .map((idx: any) => filledArr[idx]);
        finalArr = [...finalArr, ...reorderedArr];
      } catch (e) {
        throw new Error(
          `${errorHasMessage(e) ? e.message : e} in chord ${i + 1} "${c}"`
        );
      }
    });
  } else {
    throw new TypeError('Invalid value for chords');
  }

  return finalArr;
};
