'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pattern = function pattern() {
	var len = arguments.length <= 0 || arguments[0] === undefined ? 4 : arguments[0];
	var chars = arguments.length <= 1 || arguments[1] === undefined ? 'x_x_' : arguments[1];
	var shuffle = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	if (shuffle) {
		chars = _utils2.default.shuffle(chars.split('')).join('');
	}
	return chars.repeat(len);
};

exports.default = pattern;