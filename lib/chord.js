'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mode = require('./mode');

var getMode = _interopRequireWildcard(_mode);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var mode = getMode();

exports.default = function (root, mode, octave, add7) {
	return mode(root, mode, octave).filter(function (note, idx) {
		// return only the 1st (0), 3rd (2) and 5th (4) note
		// and the 7th (6) note if add7 is true
		return idx === 0 || idx === 2 || idx === 4 || add7 && idx === 6;
	}).join(',');
};