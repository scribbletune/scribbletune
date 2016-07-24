"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var utils = {
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
	}
};

exports.default = utils;