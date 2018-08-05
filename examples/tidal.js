'use strict';

const scribble = require('../src/');

const gMelMn = scribble.scale('A5 melodic minor').slice(0, 5);
const bFlatMelMn = scribble.scale('C4 melodic minor').slice(0, 7);

const getMelody = () => {
	const clipA = scribble.clip({
		pattern: '[xxx]',
		notes: bFlatMelMn,
		shuffle: true
	});

	const clipB = scribble.clip({
		pattern: 'x',
		notes: gMelMn,
		shuffle: true
	});

	return clipA.concat(clipB);
};

scribble.midi(getMelody().concat(getMelody(), getMelody(), getMelody()));
