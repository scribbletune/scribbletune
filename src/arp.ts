import { getChord } from './chord';

/**
 * Take an array and fill it with it s own elements in the next octave till it s of the specified `len`
 * @param  {Array} arr e.g. ['a4', 'b4']
 * @param  {Number} e.g. len 4
 * @return {Array} e.g. ['a4', 'b4', 'a5', 'b5']
 */
const fillArr = (arr: string[], len: number) => {
  const bumpOctave = (el: string): string => {
    const note = el.replace(/\d/, '');
    const oct = el.replace(/\D/g, '');
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
  chords: string;
};

/**
 *
 * @param chordsOrParams a string that denotes comma separated chords to be used or an object with additional properties
 * By default, if this is a string, the the count of notes generated is 8 and the order is ascending.
 * For instance arp('CM FM') will result in an array of notes [C4, E4, G4, F4, A4, C4, C5, E5]
 * You can even provide Params as an object.
 * For e.g. arp({count: 8, order: '10325476', chords: 'FM-4 Gm7b5-4 AbM-4 Bbm-4 Cm-5 DbM-5 EbM-5})
 */
export const arp = (chordsOrParams: string | Params) => {
  let finalArr: any = [];
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

  const chordsArr: string[] = params.chords.split(' ');
  for (const chord of chordsArr) {
    const filledArr = fillArr(getChord(chord) as string[], params.count);
    // reorder the filledArr as per params.order
    const reorderedArr = (params.order as string)
      .split('')
      .map((idx: any) => filledArr[idx]);
    finalArr = [...finalArr, ...reorderedArr];
  }

  return finalArr;
};
