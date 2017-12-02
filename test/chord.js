'use strict';

const test = require('tape');
const scribble = require('../src/index');
const chord = require('../src/chord');

test('Scribbletune::chord', t => {
	t.equal(
		scribble.chord('Cmaj').join(),
		'c4,e4,g4',
		'C Major is C E G'
	);

	t.equal(
		scribble.chord('Cmaj-5').join(),
		'c5,e5,g5',
		'C Major is C5 E5 G5 in the 5th octave'
	);

	t.equal(
		scribble.chord('Cmin').join(),
		'c4,eb4,g4',
		'C Minor is C Eb G'
	);

	t.equal(
		scribble.chord('Cmaj7').join(),
		'c4,e4,g4,b4',
		'C Major is C E G B'
	);

	t.equal(
		scribble.chord('Cmin7').join(),
		'c4,eb4,g4,bb4',
		'C Minor is C Eb G Bb'
	);

	t.equal(
		scribble.chord('Cm7').join(),
		'c4,eb4,g4,bb4',
		'C Minor is C Eb G Bb'
	);

	t.equal(
		scribble.chord('Cm7-5').join(),
		'c5,eb5,g5,bb5',
		'C Minor is C Eb G Bb'
	);

	t.equal(
		scribble.chord('Csus2').join(),
		'c4,d4,g4',
		'C Sus2 is C D G'
	);

	t.equal(
		scribble.chord('Csus2-5').join(),
		'c5,d5,g5',
		'C Sus2 is C5 D5 G5 in the 5th octave'
	);

	t.equal(
		scribble.chord('Csus4').join(),
		'c4,f4,g4',
		'C Sus4 is C F G'
	);

	t.equal(
		scribble.chord('Cdim').join(),
		'c4,eb4,gb4',
		'C Diminished is C Eb Gb'
	);

	t.equal(
		scribble.chord('Cdim7').join(),
		'c4,eb4,gb4,a4',
		'C Diminished 7th is C Eb Gb A'
	);

	t.equal(
		scribble.chord('Caug').join(),
		'c4,e4,ab4',
		'C Augmented is C E Ab'
	);

	t.equal(
		scribble.chord('Csixth').join(),
		'c4,e4,g4,a4',
		'C sixth is C E G A'
	);

	t.equal(
		scribble.chord('Cdom7').join(),
		'c4,e4,g4,bb4',
		'C Augmented is C E G Bb'
	);

	t.equal(
		scribble.chord('fmin5').join(),
		'f5,ab5,c6',
		'F minor is F, Ab, C'
	);

	t.end();
});

test('Scribbletune::List chords', t => {
	t.equal(
		Array.isArray(scribble.listChords()),
		true,
		'Scribbletune exposes available chords'
	);
	t.equal(
		scribble.listChords().indexOf('maj') > -1,
		true,
		'Scribbletune exposes available chords, for eg maj chord'
	);
	t.equal(
		scribble.listChords().indexOf('min') > -1,
		true,
		'Scribbletune exposes available chords, for eg min chord'
	);
	t.end();
});

test('Scribbletune::Alternative names for chords', t => {
	t.equal(
		scribble.chord('CMaj').join(),
		'c4,e4,g4',
		'C Major is C E G'
	);

	t.equal(
		scribble.chord('CMin').join(),
		'c4,eb4,g4',
		'C Minor is C Eb G'
	);

	t.equal(
		scribble.chord('DbMin').join(),
		'db4,e4,ab4',
		'C Minor is Db E A♭'
	);

	t.equal(
		scribble.chord('C#Min').join(),
		'db4,e4,ab4',
		'Chord accepts accidentals provided as sharps'
	);

	t.equal(
		scribble.chord('Cm').join(),
		'c4,eb4,g4',
		'C Minor is C Eb G'
	);

	t.equal(
		scribble.chord('CDim').join(),
		'c4,eb4,gb4',
		'C Diminished is C Eb Gb'
	);

	t.equal(
		scribble.chord('CDim7').join(),
		'c4,eb4,gb4,a4',
		'C Diminished 7th is C Eb Gb A'
	);

	t.equal(
		scribble.chord('CSus2').join(),
		'c4,d4,g4',
		'C Sus2 is C D G'
	);

	t.equal(
		scribble.chord('CSus4').join(),
		'c4,f4,g4',
		'C Sus4 is C F G'
	);

	t.equal(
		scribble.chord('CAug').join(),
		'c4,e4,ab4',
		'C Augmented is C E Ab'
	);

	t.equal(
		scribble.chord('CDom7').join(),
		'c4,e4,g4,bb4',
		'C Augmented is C E G Bb'
	);

	t.equal(
		scribble.chord('C7th').join(),
		'c4,e4,g4,bb4',
		'C Augmented is C E G Bb'
	);

	t.equal(
		scribble.chord('CAug').join(),
		'c4,e4,ab4',
		'C Augmented is C E Ab'
	);

	t.equal(
		scribble.chord('CSixth').join(),
		'c4,e4,g4,a4',
		'C sixth is C E G A'
	);

	t.equal(
		scribble.chord('C6th').join(),
		'c4,e4,g4,a4',
		'C sixth is C E G A'
	);
	t.end();
});
