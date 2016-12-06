'use strict';

const utils = require('./utils');

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
