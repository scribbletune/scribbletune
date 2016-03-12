const utils = {
	shuffle: (arr) => {
		let lastIndex = arr.length - 1;
		arr.map(function(el, idx) {
			let rnd = Math.round(Math.random() * lastIndex);
			arr[idx] = arr[rnd];
			arr[rnd] = el;
		});

		return arr;
	},

	extendObject: (original, updated) => {
		for (let prop in updated) {
			if (original.hasOwnProperty(prop)) {
				original[prop] = updated[prop];
			}
		}

		return original;
	}
};

export default utils;