'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mode = require('./mode');

var _mode2 = _interopRequireDefault(_mode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chord = function chord(root, scale, octave, add7) {
	return (0, _mode2.default)(root, scale, octave).filter(function (note, idx) {
		// return only the 1st (0), 3rd (2) and 5th (4) note
		// and the 7th (6) note if add7 is true
		return idx === 0 || idx === 2 || idx === 4 || add7 && idx === 6;
	}).join(',');
};

exports.default = chord;