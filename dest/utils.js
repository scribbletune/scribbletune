'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var minorChords = ['m', 'min', 'Min', 'Minor', 'minor'];

var utils = {
	chordPtn: /^([a-gA-G][#|b]?)(maj|major|Maj|Major|m|min|Min|Minor|minor|7)(7)?(\-[0-8])?/,
	shuffle: function shuffle(arr) {
		var lastIndex = arr.length - 1;
		arr.forEach(function (el, idx) {
			var rnd = Math.round(Math.random() * lastIndex);
			arr[idx] = arr[rnd];
			arr[rnd] = el;
		});

		return arr;
	},

	sizzleMap: function sizzleMap() {
		var maxLevel = arguments.length <= 0 || arguments[0] === undefined ? 127 : arguments[0];

		var pi = Math.PI;
		var piArr = [pi / 6, pi / 4, pi / 3, pi / 2, 2 * pi / 3, 3 * pi / 4, 5 * pi / 6, pi];
		var piArrRev = [0, pi / 6, pi / 4, pi / 3, pi / 2, 2 * pi / 3, 3 * pi / 4, 5 * pi / 6];
		piArrRev.reverse();
		var arr = piArr.concat(piArrRev);
		return arr.map(function (element) {
			return Math.round(Math.sin(element) * maxLevel);
		});
	},

	stringToChordArr: function stringToChordArr(str) {
		var scribbleChordArr = [];
		if (str.match(utils.chordPtn)) {
			var _str = 'major';
			_str.replace(utils.chordPtn, function (match, root, scale, seventh, octave) {
				scribbleChordArr.push(root);

				if (scale == 7) {
					mode = 'fifth mode';
				}

				if (minorChords.indexOf(scale) > -1) {
					mode = 'minor';
				}

				scribbleChordArr.push(mode);
				if (octave) {
					scribbleChordArr.push(+octave.substring(1));
				} else {
					scribbleChordArr.push(4);
				}
				if (seventh) {
					scribbleChordArr.push(7);
				}
			});
		}

		return scribbleChordArr;
	}
};

exports.default = utils;