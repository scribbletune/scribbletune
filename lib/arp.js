"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chord_1 = require("./chord");
/**
 * Take an array and fill it with it s own elements in the next octave till it s of the specified `len`
 * @param  {Array} arr e.g. ['a4', 'b4']
 * @param  {Number} e.g. len 4
 * @return {Array} e.g. ['a4', 'b4', 'a5', 'b5']
 */
const fillArr = (arr, len) => {
    const bumpOctave = (el) => {
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
/**
 *
 * @param chordsOrParams a string that denotes comma seprated chords to be used or an object with additional properties
 * By default, if this is a string, the the count of notes generated is 8 and the order is ascending.
 * For instance arp('CM FM') will result in an array of notes [C4, E4, G4, F4, A4, C4, C5, E5]
 */
exports.arp = (chordsOrParams) => {
    let finalArr = [];
    const params = {
        count: 8,
        order: '01234567',
        chords: '',
    };
    if (typeof chordsOrParams === 'string') {
        params.chords = chordsOrParams;
    }
    else {
        Object.assign(params, chordsOrParams);
    }
    if (params.count > 8 || params.count < 2) {
        throw new TypeError('Invalid value for count');
    }
    if (params.order.match(/\D/g) ||
        params.order.includes('8') ||
        params.order.includes('9')) {
        throw new TypeError('Invalid value for order');
    }
    const chordsArr = params.chords.split(' ');
    for (const chord of chordsArr) {
        const filledArr = fillArr(chord_1.getChord(chord), params.count);
        // reorder the filledArr as per params.order
        const reorderedArr = params.order
            .split('')
            .map((idx) => filledArr[idx]);
        finalArr = [...finalArr, ...reorderedArr];
    }
    return finalArr;
};
