'use strict';

const test = require('tape');
const scribble = require('../src/index');

test('Scribbletune::modes Common', (t) => {
	t.equal(
		scribble.mode('c', 'ionian').join(''),
		'c3d3e3f3g3a3b3c4',
		'C Ionian is c d e f g a b'
	);
	t.equal(
		scribble.mode('d', 'dorian').join(''),
		'd3e3f3g3a3b3c4d4',
		'D Dorian is d e f g a b c'
	);
	t.equal(
		scribble.mode('e', 'phrygian').join(''),
		'e3f3g3a3b3c4d4e4',
		'E Phrygian is e f g a b c d'
	);
	t.equal(
		scribble.mode('f', 'lydian').join(''),
		'f3g3a3b3c4d4e4f4',
		'F Lydian is f g a b c d e'
	);
	t.equal(
		scribble.mode('g', 'mixolydian').join(''),
		'g3a3b3c4d4e4f4g4',
		'G Mixolydian is g a b c d e f'
	);
	t.equal(
		scribble.mode('a', 'aeolian').join(''),
		'a3b3c4d4e4f4g4a4',
		'A Aeolian is a b c d e f g'
	);
	t.equal(
		scribble.mode('b', 'locrian').join(''),
		'b3c4d4e4f4g4a4b4',
		'B Locrian is b c d e f g a'
	);
	t.end();
});

test('Scribbletune::scale Melodic Minor scales', (t) => {
	t.equal(
		scribble.scale('c', 'melodic minor').join(''),
		'c3d3d#3f3g3a3b3c4',
		'C Melodic Minor is c d d# f g a b'
	);
	t.equal(
		scribble.scale('c', 'phrygian #6').join(''),
		'c3c#3d#3f3g3a3a#3c4',
		'C Phrygian #6 is c c# d# f g a a#'
	);
	t.equal(
		scribble.scale('c', 'lydian augmented').join(''),
		'c3d3e3f#3g#3a3b3c4',
		'C Lyidan Augmented is c d e f# g# a b'
	);
	t.equal(
		scribble.scale('c', 'lydian dominant').join(''),
		'c3d3e3f#3g3a3a#3c4',
		'C Lydian Dominant is c d e f# g a a#'
	);
	t.equal(
		scribble.scale('c', 'fifth mode').join(''),
		'c3d3e3f3g3g#3a#3c4',
		'C Fifth mode is c d e f g g# a#'
	);
	t.equal(
		scribble.scale('c', 'locrian #2').join(''),
		'c3d3d#3f3f#3g#3a#3c4',
		'C Locrian #2 is c d d# f f# g# a#'
	);
	t.equal(
		scribble.scale('c', 'altered').join(''),
		'c3c#3d#3e3f#3g#3a#3c4',
		'C Altered is c c# d# e f# g# a#'
	);
	t.end();
});

test('Scribbletune::modes Blues/Jazz/Harmonic', (t) => {
	t.equal(
		scribble.mode('c', 'whole tone').join(''),
		'c3d3e3f#3g#3a#3c4',
		'C Whole Tone is c d e f# g# a#'
	);
	t.equal(
		scribble.mode('c', 'diminished whole half').join(''),
		'c3d3d#3f3f#3g#3a3b3c4',
		'C Diminished Whole Half is c d d# f f# g# a b'
	);
	t.equal(
		scribble.mode('c', 'major pentatonic').join(''),
		'c3d3e3g3a3c4',
		'C Major Pentatonic is c d e g a'
	);
	t.equal(
		scribble.mode('c', 'minor pentatonic').join(''),
		'c3d#3f3g3a#3c4',
		'C Minor Pentatonic is c d# f g a#'
	);
	t.equal(
		scribble.mode('c', 'suspended pentatonic').join(''),
		'c3d3f3g3a#3c4',
		'C Suspended Pentatonic is c d f g a#'
	);
	t.equal(
		scribble.mode('c', 'dominant pentatonic').join(''),
		'c3d3e3g3a#3c4',
		'C Dominant Pentatonic is c d e g a#'
	);
	t.equal(
		scribble.mode('c', 'japanese').join(''),
		'c3c#3f3g3g#3c4',
		'C Japanese is c c# f g g#'
	);
	t.equal(
		scribble.mode('c', 'blues').join(''),
		'c3d#3f3f#3g3a#3c4',
		'C Blues is c d# f f# g a#'
	);
	t.equal(
		scribble.mode('c', 'bebop major').join(''),
		'c3d3e3f3g3g#3a3b3c4',
		'C Bebop Major is c d e f g g# a b'
	);
	t.equal(
		scribble.mode('c', 'bebop minor').join(''),
		'c3d3d#3e3f3g3a3a#3c4',
		'C Bebop Minor is c d d# e f g a a#'
	);
	t.equal(
		scribble.mode('c', 'bebop dominant').join(''),
		'c3d3e3f3g3a3a#3b3c4',
		'C Bebop Dominant is c d e f g a a# b'
	);
	t.equal(
		scribble.mode('c', 'bebop melodic minor').join(''),
		'c3d3d#3f3g3g#3a3b3c4',
		'C Bebop Melodic Minor is c d d# f g g# a b'
	);
	t.equal(
		scribble.mode('c', 'harmonic major').join(''),
		'c3d3e3f3g3g#3b3c4',
		'C Harmonic major is c d e f g g# b'
	);
	t.equal(
		scribble.mode('c', 'harmonic minor').join(''),
		'c3d3d#3f3g3g#3b3c4',
		'C Harmonic Minor is c d d# f g g# b'
	);
	t.equal(
		scribble.mode('c', 'double harmonic major').join(''),
		'c3c#3e3f3g3g#3b3c4',
		'C Double Harmonic Minor is c c# e f g g# b'
	);
	t.end();
});

test('Scribbletune::modes Exotic', (t) => {
	t.equal(
		scribble.mode('c', 'hungarian gypsy').join(''),
		'c3d3d#3f#3g3g#3a#3c4',
		'C Hungarian Gypsy is c d d# f# g g# a#'
	);
	t.equal(
		scribble.mode('c', 'hungarian major').join(''),
		'c3d#3e3f#3g3a3a#3c4',
		'C Hungarian Major is c d# e f# g a a#'
	);
	t.equal(
		scribble.mode('c', 'phrygian dominant').join(''),
		'c3c#3e3f3g3g#3a#3c4',
		'C Phrygian Dominant is c c# e f g g# a#'
	);
	t.equal(
		scribble.mode('c', 'neapolitan minor').join(''),
		'c3c#3d#3f3g3g#3b3c4',
		'C Neopolitan Minor is c c# d# f g g# b'
	);
	t.equal(
		scribble.mode('c', 'neapolitan major').join(''),
		'c3c#3d#3f3g3a3b3c4',
		'C Neopolitan Major is c c# d# f g a b'
	);
	t.equal(
		scribble.mode('c', 'enigmatic').join(''),
		'c3c#3e3f#3g#3a#3b3c4',
		'C Enigmatic is c c# e f# g# a# b'
	);
	t.equal(
		scribble.mode('c', 'eight-tone spanish').join(''),
		'c3c#3d#3e3f3f#3g#3a#3c4',
		'C Eight-Tone Spanish is c c# d# e f f# g# a#'
	);
	t.equal(
		scribble.mode('c', 'balinese pelog').join(''),
		'c3c#3d#3g3g#3c4',
		'C Balinese Pelog is c c# d# g g#'
	);
	t.equal(
		scribble.mode('c', 'oriental').join(''),
		'c3c#3e3f3f#3a3a#3c4',
		'C Oriental is c c# e f f# a a#'
	);
	t.equal(
		scribble.mode('c', 'iwato').join(''),
		'c3c#3f3f#3a#3c4',
		'C Iwato c c# f f# a#'
	);
	t.equal(
		scribble.mode('c', 'yo').join(''),
		'c3d3f3g3a3c4',
		'C Yo is c d f g a'
	);
	t.equal(
		scribble.mode('c', 'prometheus').join(''),
		'c3d3e3f#3a3a#3c4',
		'C Prometheus is c d e f# a a#'
	);
	t.equal(
		scribble.mode('c', 'symmetrical').join(''),
		'c3c#3d#3f3g#3a3a#3c4',
		'C Symmetrical is c c# d# f g# a a#'
	);
	t.equal(
		scribble.mode('c', 'major locrian').join(''),
		'c3d3e3f3f#3g#3a#3c4',
		'C Major Locrian is c d e f f# g# a#'
	);
	t.end();
});

test('Scribbletune::modes Miscellaneous', (t) => {
	t.equal(
		scribble.mode('c', 'augmented').join(''),
		'c3d3e3f#3g#3a3b3c4',
		'C Augmented is c d e f# g# a b'
	);
	t.equal(
		scribble.mode('c', 'lydian minor').join(''),
		'c3d3e3f#3g3g#3c4',
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
		scribble.mode('c', 'major locrian', 3, false).join(''),
		'c3d3e3f3f#3g#3a#3',
		'Add root from next octave is customizable'
	);
	t.equal(
		scribble.scale('c', 'lydian dominant', 3, false).join(''),
		'c3d3e3f#3g3a3a#3',
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
