'use strict';

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
	 * @param {Number} maxLevel A number between not more than 127
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
	},

	/**
	 * Take a String input such as xxx[xx[xx]]
	 * and return an Array as ['x', 'x', 'x', ['x', 'x', ['x', 'x']]]
	 * @param  {String} str
	 * @return {Array}
	*/
	expandStr: str => {
		str = JSON.stringify(str.split(''));
		str = str.replace(/,"\[",/g, ', [');
		str = str.replace(/"\[",/g, '[');
		str = str.replace(/,"\]"/g, ']');
		return JSON.parse(str);
	},

	/**
	 * Take a string input and check if it s a note name or not
	 * @param  {String} str Note name e.g. c4
	 * @return {Boolean} Return true for c4 or return false for something like CM
	 */
	isNote: str => typeof str === 'string' && /^[a-gA-G](?:#|b)?\d$/.test(str)
};

module.exports = utils;
