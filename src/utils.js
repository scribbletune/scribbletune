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
	},

	sizzleMap: (maxLevel = 127) => {
		let sizzleArr = [];
		let pi = Math.PI;
		let piArr = [pi/6, pi/4, pi/3, pi/2, 2*pi/3, 3*pi/4, 5*pi/6, pi];
		let piArrRev = [0, pi/6, pi/4, pi/3, pi/2, 2*pi/3, 3*pi/4, 5*pi/6];
		piArrRev.reverse();
		let arr = piArr.concat(piArrRev);
		arr.map(function(element) {
			sizzleArr.push(Math.round(Math.sin(element) * maxLevel));
		});

		return sizzleArr;
	}
};

export default utils;