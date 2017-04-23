'use strict';

const minorChords = ['m', 'min', 'Min', 'Minor', 'minor'];

const utils = {
	/**
	 * Basic Array randomizer
	 * @param  {Array} arr
	 * @return {Array}
	 */
	shuffle: arr => {
		let lastIndex = arr.length - 1;
		arr.forEach((el, idx) => {
			let rnd = Math.round(Math.random() * lastIndex);
			arr[idx] = arr[rnd];
			arr[rnd] = el;
		});

		return arr;
	},

	/**
	 * Return an array of numbers relative to maxLevel || 127 ordered in a Sine wave format
	 * This is used by the `sizzle` param of the `clip` method to add a rudimentary variation to the accent of each note
	 * e.g. 
	 * @param  {Number} maxLevel A number between not more than 127
	 * @return {Array}  Example output [63, 90, 110, 127, 110, 90, 63, 0, 63, 90, 110, 127, 110, 90, 63, 0]
	 */
	sizzleMap: maxLevel => {
		maxLevel = maxLevel || 127;
		let pi = Math.PI;
		let piArr = [pi/6, pi/4, pi/3, pi/2, 2*pi/3, 3*pi/4, 5*pi/6, pi];
		let piArrRev = [0, pi/6, pi/4, pi/3, pi/2, 2*pi/3, 3*pi/4, 5*pi/6];
		piArrRev.reverse();
		let arr = piArr.concat(piArrRev);
		return arr.map(element => Math.round(Math.sin(element) * maxLevel));
	}
};

module.exports = utils;
