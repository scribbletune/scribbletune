const minorChords = ['m', 'min', 'Min', 'Minor', 'minor'];

const utils = {
	chordPtn: /^([a-gA-G][#|b]?)(maj|major|Maj|Major|m|min|Min|Minor|minor|7)(7)?(\-[0-8])?/,
	shuffle: (arr) => {
		let lastIndex = arr.length - 1;
		arr.forEach(function(el, idx) {
			let rnd = Math.round(Math.random() * lastIndex);
			arr[idx] = arr[rnd];
			arr[rnd] = el;
		});

		return arr;
	},

	sizzleMap: (maxLevel = 127) => {
		let pi = Math.PI;
		let piArr = [pi/6, pi/4, pi/3, pi/2, 2*pi/3, 3*pi/4, 5*pi/6, pi];
		let piArrRev = [0, pi/6, pi/4, pi/3, pi/2, 2*pi/3, 3*pi/4, 5*pi/6];
		piArrRev.reverse();
		let arr = piArr.concat(piArrRev);
		return arr.map(function(element) {
			return Math.round(Math.sin(element) * maxLevel);
		});
	},

	stringToChordArr: (el) => {
		let scribbleChordArr = [];
		if (el.match(utils.chordPtn)) {
			el.replace(utils.chordPtn, (match, root, scale, seventh, octave) => {
				let mode = 'major';
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

module.exports = utils;
