'use strict';
const chord = require('./chord').getChord;

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
  let finalArr =  [].concat(arr, arr1, arr2);

  // Slice and return only as much as required
  return finalArr.slice(0, len);
};

const arp = (chordsOrParams) => {
  let finalArr = [];
  let params = {
    count: 8,
    order: '01234567'
  };

  if (typeof chordsOrParams === 'string') {
    params.chords = chordsOrParams;
  } else {
    params = Object.assign({}, params, chordsOrParams);
  }

  if (params.count > 8 || params.count < 2) {
    throw new TypeError('Invalid value for count');
  }

  if (params.order.match(/\D/g) || params.order.includes('8') || params.order.includes('9')) {
    throw new TypeError('Invalid value for order');
  }

  let chordsArr = params.chords.split(' ');
  chordsArr.forEach(el => {
    let filledArr = fillArr(chord(el), params.count);
    // reorder the filledArr as per params.order
    let reorderedArr = params.order.split('').map(idx => filledArr[idx]);
    finalArr = [].concat(finalArr, reorderedArr);
  });

  return finalArr;
};

module.exports = arp;
