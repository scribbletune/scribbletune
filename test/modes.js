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
		'c4d4eb4f4g4a4b4c5',
		'C Melodic Minor is c d e♭ f g a b'
	);
	t.equal(
		scribble.scale('c', 'phrygian #6').join(''),
		'c4db4eb4f4g4a4bb4c5',
		'C Phrygian #6 is c d♭ e♭ f g a b♭'
	);
	t.equal(
		scribble.scale('c', 'lydian augmented').join(''),
		'c4d4e4gb4ab4a4b4c5',
		'C Lyidan Augmented is c d e g♭ a♭ a b'
	);
	t.equal(
		scribble.scale('c', 'lydian dominant').join(''),
		'c4d4e4gb4g4a4bb4c5',
		'C Lydian Dominant is c d e g♭ g a b♭'
	);
	t.equal(
		scribble.scale('c', 'fifth mode').join(''),
		'c4d4e4f4g4ab4bb4c5',
		'C Fifth mode is c d e f g a♭ b♭'
	);
	t.equal(
		scribble.scale('c', 'locrian #2').join(''),
		'c4d4eb4f4gb4ab4bb4c5',
		'C Locrian #2 is c d e♭ f g♭ a♭ b♭'
	);
	t.equal(
		scribble.scale('c', 'altered').join(''),
		'c4db4eb4e4gb4ab4bb4c5',
		'C Altered is c d♭ e♭ e g♭ a♭ b♭'
	);
	t.end();
});

test('Scribbletune::modes Blues/Jazz/Harmonic', (t) => {
	t.equal(
		scribble.mode('c', 'whole tone').join(''),
		'c4d4e4gb4ab4bb4c5',
		'C Whole Tone is c d e g♭ a♭ b♭'
	);
	t.equal(
		scribble.mode('c', 'diminished whole half').join(''),
		'c4d4eb4f4gb4ab4a4b4c5',
		'C Diminished Whole Half is c d e♭ f g♭ a♭ a b'
	);
	t.equal(
		scribble.mode('c', 'major pentatonic').join(''),
		'c4d4e4g4a4c5',
		'C Major Pentatonic is c d e g a'
	);
	t.equal(
		scribble.mode('c', 'minor pentatonic').join(''),
		'c4eb4f4g4bb4c5',
		'C Minor Pentatonic is c e♭ f g b♭'
	);
	t.equal(
		scribble.mode('c', 'suspended pentatonic').join(''),
		'c4d4f4g4bb4c5',
		'C Suspended Pentatonic is c d f g b♭'
	);
	t.equal(
		scribble.mode('c', 'dominant pentatonic').join(''),
		'c4d4e4g4bb4c5',
		'C Dominant Pentatonic is c d e g b♭'
	);
	t.equal(
		scribble.mode('c', 'japanese').join(''),
		'c4db4f4g4ab4c5',
		'C Japanese is c d♭ f g a♭'
	);
	t.equal(
		scribble.mode('c', 'blues').join(''),
		'c4eb4f4gb4g4bb4c5',
		'C Blues is c e♭ f g♭ g b♭'
	);
	t.equal(
		scribble.mode('c', 'bebop major').join(''),
		'c4d4e4f4g4ab4a4b4c5',
		'C Bebop Major is c d e f g a♭ a b'
	);
	t.equal(
		scribble.mode('c', 'bebop minor').join(''),
		'c4d4eb4e4f4g4a4bb4c5',
		'C Bebop Minor is c d e♭ e f g a b♭'
	);
	t.equal(
		scribble.mode('c', 'bebop dominant').join(''),
		'c4d4e4f4g4a4bb4b4c5',
		'C Bebop Dominant is c d e f g a b♭ b'
	);
	t.equal(
		scribble.mode('c', 'bebop melodic minor').join(''),
		'c4d4eb4f4g4ab4a4b4c5',
		'C Bebop Melodic Minor is c d e♭ f g a♭ a b'
	);
	t.equal(
		scribble.mode('c', 'harmonic major').join(''),
		'c4d4e4f4g4ab4b4c5',
		'C Harmonic major is c d e f g a♭ b'
	);
	t.equal(
		scribble.mode('c', 'harmonic minor').join(''),
		'c4d4eb4f4g4ab4b4c5',
		'C Harmonic Minor is c d e♭ f g a♭ b'
	);
	t.equal(
		scribble.mode('c', 'double harmonic major').join(''),
		'c4db4e4f4g4ab4b4c5',
		'C Double Harmonic Minor is c d♭ e f g a♭ b'
	);
	t.end();
});

test('Scribbletune::modes Exotic', (t) => {
	t.equal(
		scribble.mode('c', 'hungarian gypsy').join(''),
		'c4d4eb4gb4g4ab4bb4c5',
		'C Hungarian Gypsy is c d e♭ g♭ g a♭ b♭'
	);
	t.equal(
		scribble.mode('c', 'hungarian major').join(''),
		'c4eb4e4gb4g4a4bb4c5',
		'C Hungarian Major is c e♭ e g♭ g a b♭'
	);
	t.equal(
		scribble.mode('c', 'phrygian dominant').join(''),
		'c4db4e4f4g4ab4bb4c5',
		'C Phrygian Dominant is c d♭ e f g a♭ b♭'
	);
	t.equal(
		scribble.mode('c', 'neapolitan minor').join(''),
		'c4db4eb4f4g4ab4b4c5',
		'C Neopolitan Minor is c d♭ e♭ f g a♭ b'
	);
	t.equal(
		scribble.mode('c', 'neapolitan major').join(''),
		'c4db4eb4f4g4a4b4c5',
		'C Neopolitan Major is c d♭ e♭ f g a b'
	);
	t.equal(
		scribble.mode('c', 'enigmatic').join(''),
		'c4db4e4gb4ab4bb4b4c5',
		'C Enigmatic is c d♭ e g♭ a♭ b♭ b'
	);
	t.equal(
		scribble.mode('c', 'eight-tone spanish').join(''),
		'c4db4eb4e4f4gb4ab4bb4c5',
		'C Eight-Tone Spanish is c d♭ e♭ e f g♭ a♭ b♭'
	);
	t.equal(
		scribble.mode('c', 'balinese pelog').join(''),
		'c4db4eb4g4ab4c5',
		'C Balinese Pelog is c d♭ e♭ g a♭'
	);
	t.equal(
		scribble.mode('c', 'oriental').join(''),
		'c4db4e4f4gb4a4bb4c5',
		'C Oriental is c d♭ e f g♭ a b♭'
	);
	t.equal(
		scribble.mode('c oriental').join(''),
		'c4db4e4f4gb4a4bb4c5',
		'C Oriental is c d♭ e f g♭ a b♭'
	);
	t.equal(
		scribble.mode('c', 'iwato').join(''),
		'c4db4f4gb4bb4c5',
		'C Iwato c d♭ f g♭ b♭'
	);
	t.equal(
		scribble.mode('c', 'yo').join(''),
		'c4d4f4g4a4c5',
		'C Yo is c d f g a'
	);
	t.equal(
		scribble.mode('c', 'prometheus').join(''),
		'c4d4e4gb4a4bb4c5',
		'C Prometheus is c d e g♭ a b♭'
	);
	t.equal(
		scribble.mode('c', 'symmetrical').join(''),
		'c4db4eb4f4ab4a4bb4c5',
		'C Symmetrical is c d♭ e♭ f a♭ a b♭'
	);
	t.equal(
		scribble.mode('c', 'major locrian').join(''),
		'c4d4e4f4gb4ab4bb4c5',
		'C Major Locrian is c d e f g♭ a♭ b♭'
	);
	t.equal(
		scribble.mode('c major locrian').join(''),
		'c4d4e4f4gb4ab4bb4c5',
		'C Major Locrian is c d e f g♭ a♭ b♭'
	);
	t.equal(
		scribble.mode('c neapolitan minor').join(''),
		'c4db4eb4f4g4ab4b4c5',
		'C Neopolitan Minor is c d♭ e♭ f g a♭ b'
	);
	t.end();
});

test('Scribbletune::modes Miscellaneous', (t) => {
	t.equal(
		scribble.mode('c', 'augmented').join(''),
		'c4d4e4gb4ab4a4b4c5',
		'C Augmented is c d e g♭ a♭ a b'
	);
	t.equal(
		scribble.mode('c augmented').join(''),
		'c4d4e4gb4ab4a4b4c5',
		'C Augmented is c d e g♭ a♭ a b'
	);
	t.equal(
		scribble.mode('c', 'lydian minor').join(''),
		'c4d4e4gb4g4ab4c5',
		'C Lydian Minor is c d e g♭ g a♭'
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
		'c4d4e4f4gb4ab4bb4',
		'Add root from next octave is customizable'
	);
	t.equal(
		scribble.mode('c major locrian 4 false').join(''),
		'c4d4e4f4gb4ab4bb4',
		'Add root from next octave is customizable'
	);
	t.equal(
		scribble.scale('c', 'lydian dominant', 4, false).join(''),
		'c4d4e4gb4g4a4bb4',
		'Add root from next octave is customizable'
	);
	t.equal(
		scribble.mode('c#', 'ionian').join(''),
		'db4eb4f4gb4ab4bb4c5db5',
		'Mode accepts accidentals provided as sharps'
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
