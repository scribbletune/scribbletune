'use strict';

const test = require('tape');
const scribble = require('../src/index');

test('Scribbletune::modes Common', (t) => {
	t.equal(
		scribble.mode('c', 'ionian').join(''),
		'C4D4E4F4G4A4B4',
		'C Ionian is c d e f g a b'
	);
	t.equal(
		scribble.mode('c', 'ionian', 5).join(''),
		'C5D5E5F5G5A5B5',
		'C Ionian in the fifth octave is c5 d5 e5 f5 g5 a5 b5 c6'
	);
	t.equal(
		scribble.mode('c ionian').join(''),
		'C4D4E4F4G4A4B4',
		'C Ionian is c d e f g a b'
	);
	t.equal(
		scribble.mode('d', 'dorian').join(''),
		'D4E4F4G4A4B4C5',
		'D Dorian is d e f g a b c'
	);
	t.equal(
		scribble.mode('e', 'phrygian').join(''),
		'E4F4G4A4B4C5D5',
		'E Phrygian is e f g a b c d'
	);
	t.equal(
		scribble.mode('f', 'lydian').join(''),
		'F4G4A4B4C5D5E5',
		'F Lydian is f g a b c d e'
	);
	t.equal(
		scribble.mode('g', 'mixolydian').join(''),
		'G4A4B4C5D5E5F5',
		'G Mixolydian is g a b c d e f'
	);
	t.equal(
		scribble.mode('a', 'aeolian').join(''),
		'A4B4C5D5E5F5G5',
		'A Aeolian is a b c d e f g'
	);
	t.end();
});
