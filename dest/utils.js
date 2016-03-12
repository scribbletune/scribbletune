"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var utils = {
	shuffle: function shuffle(arr) {
		var lastIndex = arr.length - 1;
		arr.map(function (el, idx) {
			var rnd = Math.round(Math.random() * lastIndex);
			arr[idx] = arr[rnd];
			arr[rnd] = el;
		});

		return arr;
	},

	extendObject: function extendObject(original, updated) {
		for (var prop in updated) {
			if (original.hasOwnProperty(prop)) {
				original[prop] = updated[prop];
			}
		}

		return original;
	}
};

exports.default = utils;