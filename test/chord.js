'use strict';

const test = require('tape');
const scribble = require('../src/index');
const chord = require('../src/chord');

test('Scribbletune::chord', t => {
	t.equal(
		chord.getChord('Cmaj').join(),
		'c4,e4,g4',
		'C Major is C E G'
	);

	t.equal(
		chord.getChord('Cmaj-5').join(),
		'c5,e5,g5',
		'C Major is C5 E5 G5 in the 5th octave'
	);

	t.equal(
		chord.getChord('Cmin').join(),
		'c4,d#4,g4',
		'C Minor is C D# G'
	);

	t.equal(
		chord.getChord('Csus2').join(),
		'c4,d4,g4',
		'C Sus2 is C D G'
	);

	t.equal(
		chord.getChord('Csus2-5').join(),
		'c5,d5,g5',
		'C Sus2 is C5 D5 G5 in the 5th octave'
	);

	t.equal(
		chord.getChord('Csus4').join(),
		'c4,f4,g4',
		'C Sus4 is C F G'
	);

	t.equal(
		chord.getChord('Cdim').join(),
		'c4,d#4,f#4',
		'C Diminished is C D# F#'
	);

	t.equal(
		chord.getChord('Cdim7').join(),
		'c4,d#4,f#4,a4',
		'C Diminished 7th is C D# F# A'
	);

	t.equal(
		chord.getChord('Caug').join(),
		'c4,e4,g#4',
		'C Augmented is C E G#'
	);

	t.equal(
		chord.getChord('Csixth').join(),
		'c4,e4,g4,a4',
		'C sixth is C E G A'
	);

	t.equal(
		chord.getChord('Cdom7').join(),
		'c4,e4,g4,a#4',
		'C Augmented is C E G A#'
	);
	t.end();
});

test('Scribbletune::Available chords', t => {
	t.equal(
		Array.isArray(scribble.chords),
		true,
		'Scribbletune exposes available chords'
	);
	t.equal(
		scribble.chords.indexOf('maj') > -1,
		true,
		'Scribbletune exposes available chords, for eg maj chord'
	);
	t.equal(
		scribble.chords.indexOf('min') > -1,
		true,
		'Scribbletune exposes available chords, for eg min chord'
	);
	t.end();
});

test('Scribbletune::Alternative names for chords', t => {
	t.equal(
		chord.getChord('CMaj').join(),
		'c4,e4,g4',
		'C Major is C E G'
	);

	t.equal(
		chord.getChord('CMin').join(),
		'c4,d#4,g4',
		'C Minor is C D# G'
	);

	t.equal(
		chord.getChord('Cm').join(),
		'c4,d#4,g4',
		'C Minor is C D# G'
	);

	t.equal(
		chord.getChord('CDim').join(),
		'c4,d#4,f#4',
		'C Diminished is C D# F#'
	);

	t.equal(
		chord.getChord('CDim7').join(),
		'c4,d#4,f#4,a4',
		'C Diminished 7th is C D# F# A'
	);

	t.equal(
		chord.getChord('CSus2').join(),
		'c4,d4,g4',
		'C Sus2 is C D G'
	);

	t.equal(
		chord.getChord('CSus4').join(),
		'c4,f4,g4',
		'C Sus4 is C F G'
	);

	t.equal(
		chord.getChord('CAug').join(),
		'c4,e4,g#4',
		'C Augmented is C E G#'
	);

	t.equal(
		chord.getChord('CDom7').join(),
		'c4,e4,g4,a#4',
		'C Augmented is C E G A#'
	);

	t.equal(
		chord.getChord('C7').join(),
		'c4,e4,g4,a#4',
		'C Augmented is C E G A#'
	);

	t.equal(
		chord.getChord('CAug').join(),
		'c4,e4,g#4',
		'C Augmented is C E G#'
	);

	t.end();
});
