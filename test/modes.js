'use strict';

const test = require('tape');
const scribble = require('../src/index');

test('Scribbletune::modes Common', (t) => {
	t.equal(
		scribble.mode('c', 'ionian').join(''),
		'c4d4e4f4g4a4b4c5',
		'C Ionian is c d e f g a b'
	);
	t.equal(
		scribble.mode('c', 'ionian', 5).join(''),
		'c5d5e5f5g5a5b5c6',
		'C Ionian in the fifth octave is c5 d5 e5 f5 g5 a5 b5 c6'
	);
	t.equal(
		scribble.mode('c', 'ionian', 5, false).join(''),
		'c5d5e5f5g5a5b5',
		'C Ionian in the fifth octave without c from next octave is c5 d5 e5 f5 g5 a5 b5'
	);
	t.equal(
		scribble.mode('c ionian').join(''),
		'c4d4e4f4g4a4b4c5',
		'C Ionian is c d e f g a b'
	);
	t.equal(
		scribble.mode('d', 'dorian').join(''),
		'd4e4f4g4a4b4c5d5',
		'D Dorian is d e f g a b c'
	);
	t.equal(
		scribble.mode('e', 'phrygian').join(''),
		'e4f4g4a4b4c5d5e5',
		'E Phrygian is e f g a b c d'
	);
	t.equal(
		scribble.mode('f', 'lydian').join(''),
		'f4g4a4b4c5d5e5f5',
		'F Lydian is f g a b c d e'
	);
	t.equal(
		scribble.mode('g', 'mixolydian').join(''),
		'g4a4b4c5d5e5f5g5',
		'G Mixolydian is g a b c d e f'
	);
	t.equal(
		scribble.mode('a', 'aeolian').join(''),
		'a4b4c5d5e5f5g5a5',
		'A Aeolian is a b c d e f g'
	);
	t.equal(
		scribble.mode('b', 'locrian').join(''),
		'b4c5d5e5f5g5a5b5',
		'B Locrian is b c d e f g a'
	);
	t.end();
});

test('Scribbletune::scale Melodic Minor scales', (t) => {
	t.equal(
		scribble.scale('c', 'melodic minor').join(''),
		'c4d4d#4f4g4a4b4c5',
		'C Melodic Minor is c d d# f g a b'
	);
	t.equal(
		scribble.scale('c', 'phrygian #6').join(''),
		'c4c#4d#4f4g4a4a#4c5',
		'C Phrygian #6 is c c# d# f g a a#'
	);
	t.equal(
		scribble.scale('c', 'lydian augmented').join(''),
		'c4d4e4f#4g#4a4b4c5',
		'C Lyidan Augmented is c d e f# g# a b'
	);
	t.equal(
		scribble.scale('c', 'lydian dominant').join(''),
		'c4d4e4f#4g4a4a#4c5',
		'C Lydian Dominant is c d e f# g a a#'
	);
	t.equal(
		scribble.scale('c', 'fifth mode').join(''),
		'c4d4e4f4g4g#4a#4c5',
		'C Fifth mode is c d e f g g# a#'
	);
	t.equal(
		scribble.scale('c', 'locrian #2').join(''),
		'c4d4d#4f4f#4g#4a#4c5',
		'C Locrian #2 is c d d# f f# g# a#'
	);
	t.equal(
		scribble.scale('c', 'altered').join(''),
		'c4c#4d#4e4f#4g#4a#4c5',
		'C Altered is c c# d# e f# g# a#'
	);
	t.end();
});

test('Scribbletune::modes Blues/Jazz/Harmonic', (t) => {
	t.equal(
		scribble.mode('c', 'whole tone').join(''),
		'c4d4e4f#4g#4a#4c5',
		'C Whole Tone is c d e f# g# a#'
	);
	t.equal(
		scribble.mode('c', 'diminished whole half').join(''),
		'c4d4d#4f4f#4g#4a4b4c5',
		'C Diminished Whole Half is c d d# f f# g# a b'
	);
	t.equal(
		scribble.mode('c', 'major pentatonic').join(''),
		'c4d4e4g4a4c5',
		'C Major Pentatonic is c d e g a'
	);
	t.equal(
		scribble.mode('c', 'minor pentatonic').join(''),
		'c4d#4f4g4a#4c5',
		'C Minor Pentatonic is c d# f g a#'
	);
	t.equal(
		scribble.mode('c', 'suspended pentatonic').join(''),
		'c4d4f4g4a#4c5',
		'C Suspended Pentatonic is c d f g a#'
	);
	t.equal(
		scribble.mode('c', 'dominant pentatonic').join(''),
		'c4d4e4g4a#4c5',
		'C Dominant Pentatonic is c d e g a#'
	);
	t.equal(
		scribble.mode('c', 'japanese').join(''),
		'c4c#4f4g4g#4c5',
		'C Japanese is c c# f g g#'
	);
	t.equal(
		scribble.mode('c', 'blues').join(''),
		'c4d#4f4f#4g4a#4c5',
		'C Blues is c d# f f# g a#'
	);
	t.equal(
		scribble.mode('c', 'bebop major').join(''),
		'c4d4e4f4g4g#4a4b4c5',
		'C Bebop Major is c d e f g g# a b'
	);
	t.equal(
		scribble.mode('c', 'bebop minor').join(''),
		'c4d4d#4e4f4g4a4a#4c5',
		'C Bebop Minor is c d d# e f g a a#'
	);
	t.equal(
		scribble.mode('c', 'bebop dominant').join(''),
		'c4d4e4f4g4a4a#4b4c5',
		'C Bebop Dominant is c d e f g a a# b'
	);
	t.equal(
		scribble.mode('c', 'bebop melodic minor').join(''),
		'c4d4d#4f4g4g#4a4b4c5',
		'C Bebop Melodic Minor is c d d# f g g# a b'
	);
	t.equal(
		scribble.mode('c', 'harmonic major').join(''),
		'c4d4e4f4g4g#4b4c5',
		'C Harmonic major is c d e f g g# b'
	);
	t.equal(
		scribble.mode('c', 'harmonic minor').join(''),
		'c4d4d#4f4g4g#4b4c5',
		'C Harmonic Minor is c d d# f g g# b'
	);
	t.equal(
		scribble.mode('c', 'double harmonic major').join(''),
		'c4c#4e4f4g4g#4b4c5',
		'C Double Harmonic Minor is c c# e f g g# b'
	);
	t.end();
});

test('Scribbletune::modes Exotic', (t) => {
	t.equal(
		scribble.mode('c', 'hungarian gypsy').join(''),
		'c4d4d#4f#4g4g#4a#4c5',
		'C Hungarian Gypsy is c d d# f# g g# a#'
	);
	t.equal(
		scribble.mode('c', 'hungarian major').join(''),
		'c4d#4e4f#4g4a4a#4c5',
		'C Hungarian Major is c d# e f# g a a#'
	);
	t.equal(
		scribble.mode('c', 'phrygian dominant').join(''),
		'c4c#4e4f4g4g#4a#4c5',
		'C Phrygian Dominant is c c# e f g g# a#'
	);
	t.equal(
		scribble.mode('c', 'neapolitan minor').join(''),
		'c4c#4d#4f4g4g#4b4c5',
		'C Neopolitan Minor is c c# d# f g g# b'
	);
	t.equal(
		scribble.mode('c', 'neapolitan major').join(''),
		'c4c#4d#4f4g4a4b4c5',
		'C Neopolitan Major is c c# d# f g a b'
	);
	t.equal(
		scribble.mode('c', 'enigmatic').join(''),
		'c4c#4e4f#4g#4a#4b4c5',
		'C Enigmatic is c c# e f# g# a# b'
	);
	t.equal(
		scribble.mode('c', 'eight-tone spanish').join(''),
		'c4c#4d#4e4f4f#4g#4a#4c5',
		'C Eight-Tone Spanish is c c# d# e f f# g# a#'
	);
	t.equal(
		scribble.mode('c', 'balinese pelog').join(''),
		'c4c#4d#4g4g#4c5',
		'C Balinese Pelog is c c# d# g g#'
	);
	t.equal(
		scribble.mode('c', 'oriental').join(''),
		'c4c#4e4f4f#4a4a#4c5',
		'C Oriental is c c# e f f# a a#'
	);
	t.equal(
		scribble.mode('c oriental').join(''),
		'c4c#4e4f4f#4a4a#4c5',
		'C Oriental is c c# e f f# a a#'
	);
	t.equal(
		scribble.mode('c', 'iwato').join(''),
		'c4c#4f4f#4a#4c5',
		'C Iwato c c# f f# a#'
	);
	t.equal(
		scribble.mode('c', 'yo').join(''),
		'c4d4f4g4a4c5',
		'C Yo is c d f g a'
	);
	t.equal(
		scribble.mode('c', 'prometheus').join(''),
		'c4d4e4f#4a4a#4c5',
		'C Prometheus is c d e f# a a#'
	);
	t.equal(
		scribble.mode('c', 'symmetrical').join(''),
		'c4c#4d#4f4g#4a4a#4c5',
		'C Symmetrical is c c# d# f g# a a#'
	);
	t.equal(
		scribble.mode('c', 'major locrian').join(''),
		'c4d4e4f4f#4g#4a#4c5',
		'C Major Locrian is c d e f f# g# a#'
	);
	t.equal(
		scribble.mode('c major locrian').join(''),
		'c4d4e4f4f#4g#4a#4c5',
		'C Major Locrian is c d e f f# g# a#'
	);
	t.equal(
		scribble.mode('c neapolitan minor').join(''),
		'c4c#4d#4f4g4g#4b4c5',
		'C Neopolitan Minor is c c# d# f g g# b'
	);
	t.end();
});

test('Scribbletune::modes Miscellaneous', (t) => {
	t.equal(
		scribble.mode('c', 'augmented').join(''),
		'c4d4e4f#4g#4a4b4c5',
		'C Augmented is c d e f# g# a b'
	);
	t.equal(
		scribble.mode('c augmented').join(''),
		'c4d4e4f#4g#4a4b4c5',
		'C Augmented is c d e f# g# a b'
	);
	t.equal(
		scribble.mode('c', 'lydian minor').join(''),
		'c4d4e4f#4g4g#4c5',
		'C Lydian Minor is c d e f# g g#'
	);
	t.equal(
		scribble.mode('c', 'ionian').join(''),
		scribble.mode('c', 'major').join(''),
		'Ionian mode is also known as Major scale'
	);
	t.equal(
		scribble.mode('a', 'aeolian').join(''),
		scribble.mode('a', 'minor').join(''),
		'Aeolian mode is also known as  Minor scale'
	);
	t.equal(
		scribble.mode('c', 'diminished whole half').join(''),
		scribble.mode('c', 'diminished half whole').join(''),
		'Diminished Whole Half is also known as Diminished Half Whole'
	);
	t.equal(
		scribble.mode('c', 'lydian dominant').join(''),
		scribble.mode('c', 'mixolydian #4').join(''),
		'Lydian Dominant is also known as Mixolydian #4'
	);
	t.equal(
		scribble.mode('c', 'fifth mode').join(''),
		scribble.mode('c', 'mixolydian b6').join(''),
		'Fifth mode is also known as mixolydian b6'
	);
	t.equal(
		scribble.mode('c', 'locrian #2').join(''),
		scribble.mode('c', 'aeolian b5').join(''),
		'Locrian #2 is also known as aeolian b5'
	);
	t.equal(
		scribble.mode('c', 'major locrian', 4, false).join(''),
		'c4d4e4f4f#4g#4a#4',
		'Add root from next octave is customizable'
	);
	t.equal(
		scribble.mode('c major locrian 4 false').join(''),
		'c4d4e4f4f#4g#4a#4',
		'Add root from next octave is customizable'
	);
	t.equal(
		scribble.scale('c', 'lydian dominant', 4, false).join(''),
		'c4d4e4f#4g4a4a#4',
		'Add root from next octave is customizable'
	);
	t.end();
});

test('Available modes', function(t) {
	t.equal(
		Array.isArray(scribble.modes),
		true,
		'Scribbletune exposes available modes'
	);
	t.equal(
		scribble.modes.indexOf('ionian') > -1,
		true,
		'Scribbletune exposes available modes, for eg Ionian mode'
	);
	t.equal(
		scribble.scales.indexOf('minor') > -1,
		true,
		'Scribbletune exposes available modes as scales, for eg Minor scale'
	);
	t.end();
});
