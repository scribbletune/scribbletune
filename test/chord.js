'use strict';

const test = require('tape');
const scribble = require('../src/index');

test('Scribbletune::chord', t => {
	t.equal(
		scribble.chord('CM').join(),
		'C4,E4,G4',
		'C Major is C E G'
	);

	t.equal(
		scribble.chord('CM-5').join(),
		'C5,E5,G5',
		'C Major is C5 E5 G5 in the 5th octave'
	);

	t.equal(
		scribble.chord('Cm').join(),
		'C4,Eb4,G4',
		'C Minor is C Eb G'
	);

	t.equal(
		scribble.chord('CMaj7').join(),
		'C4,E4,G4,B4',
		'C Major is C E G B'
	);

	t.equal(
		scribble.chord('Cm7').join(),
		'C4,Eb4,G4,Bb4',
		'C Minor is C Eb G Bb'
	);

	t.equal(
		scribble.chord('Cm7-5').join(),
		'C5,Eb5,G5,Bb5',
		'C Minor is C Eb G Bb'
	);

	t.equal(
		scribble.chord('CMsus2').join(),
		'C4,D4,G4',
		'C Sus2 is C D G'
	);

	t.equal(
		scribble.chord('CMsus2-5').join(),
		'C5,D5,G5',
		'C Sus2 is C5 D5 G5 in the 5th octave'
	);

	t.equal(
		scribble.chord('CMsus4').join(),
		'C4,F4,G4',
		'C Sus4 is C F G'
	);
	t.end();
});

test('Scribbletune::List chords', t => {
	t.equal(
		Array.isArray(scribble.listChords()),
		true,
		'Scribbletune exposes available chords'
	);
	t.end();
});

