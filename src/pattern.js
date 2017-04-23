'use strict';

const utils = require('./utils');

/**
 * Generate a pattern based on the parameters provided
 * @param  {Number} len     Number of times to repeat the `chars` String
 * @param  {String} chars   The characters to be used for the pattern. e.g. any combination of x, - and x_
 * @param  {Boolean} shuffle Should the provided `chars` be shuffled
 * @return {String}        If len is 2 and chars is 'x---' and shuffle is false, then output is x---x---
 */
const pattern = (len, chars, shuffle) => {
	len = len || 4;
	chars = chars || 'x_x_';
	shuffle = shuffle || false;
	if (shuffle) {
		chars = utils.shuffle(chars.split('')).join('');
	}
	return chars.repeat(len);
}

module.exports = pattern;
