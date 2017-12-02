'use strict';

const test = require('tape');
const scribble = require('../src/index');

test('clip should use provided notes', (t) => {
	t.equal(
		scribble.clip({
			notes: ['d3']
		})[0].note[0],
		'd3',
		'Clip function uses the provided notes'
	);

	t.end();
});

test('clip should allow uppercase notes', (t) => {
	t.equal(
		scribble.clip({
			notes: 'D3'
		})[0].note[0],
		'D3',
		'Clip function uses the notes entered as uppercase'
	);

	t.end();
});

test('clip should throw an error in case of invalid notes', (t) => {
	t.throws(function() {
		scribble.clip({notes: ['k1']});
	});

	t.end();
});

test('clip should allow passing a string of notes', (t) => {
	let clip = scribble.clip({
		notes: 'c4 d4 e4',
		pattern: 'xxx'
	});
	t.equal(clip[0].note[0], 'c4', 'Clip uses provided notes as a string');
	t.equal(clip[1].note[0], 'd4', 'Clip uses provided notes as a string');
	t.equal(clip[2].note[0], 'e4', 'Clip uses provided notes as a string');
	t.end();
});

test('clip should allow passing a string of notes with chords', (t) => {
	let clip = scribble.clip({
		notes: 'c4 Dmaj e4',
		pattern: 'xxx'
	});
	t.equal(clip[0].note[0], 'c4', 'Clip uses provided notes as a string');
	t.equal(clip[1].note[0], 'd4', 'Clip uses provided notes as a string');
	t.equal(clip[1].note[1], 'gb4', 'Clip uses provided notes as a string');
	t.equal(clip[1].note[2], 'a4', 'Clip uses provided notes as a string');
	t.equal(clip[2].note[0], 'e4', 'Clip uses provided notes as a string');
	t.end();
});

test('clip should allow passing a string of notes with chords with octave', (t) => {
	let clip = scribble.clip({
		notes: 'c4 Dmaj-5 e4',
		pattern: 'xxx'
	});
	t.equal(clip[0].note[0], 'c4', 'Clip uses provided notes as a string');
	t.equal(clip[1].note[0], 'd5', 'Clip uses provided notes as a string');
	t.equal(clip[1].note[1], 'gb5', 'Clip uses provided notes as a string');
	t.equal(clip[1].note[2], 'a5', 'Clip uses provided notes as a string');
	t.equal(clip[2].note[0], 'e4', 'Clip uses provided notes as a string');
	t.end();
});

test('clip should validate provided notes & pattern using default notes and patterns in their absence', (t) => {
	let clip;
	t.throws(function() {
		scribble.clip({pattern: 'kkjd'});
	});
	t.throws(function() {
		scribble.clip({notes: ['k1']});
	});
	clip = scribble.clip({pattern: 'x_______x-------'}),
	t.equal(clip[0].length, 256, 'Clip uses provided pattern');
	t.equal(clip[8].length, 32, 'Clip uses provided pattern');
	t.equal(clip[0].note[0], 'c3', 'Clip uses default note and octave');

	clip = scribble.clip();
	t.equal(clip[0].length, 512, 'Clip uses a default pattern');
	t.equal(clip[0].note[0], 'c3', 'Clip uses default note and octave');

	t.end();
});

test('clip should shuffle provided notes', (t) => {
	let clip = scribble.clip({
		notes: scribble.scale('c', 'major', 3),
		pattern: 'xxxx',
		shuffle: true
	});
	t.equal(
		clip[0].note[0] === 'c3' && clip[0].note[1] === 'd3',
		false,
		'Clip function uses the provided notes'
	);

	t.end();
});

test('clip should allow setting accentMap with a x-_ string', (t) => {
	let clip = scribble.clip({
		notes: ['c4'],
		accentMap: 'x-x-',
		pattern: 'xxxx'
	});
	t.equal(
		clip[0].level,
		127,
		'Clip function uses the provided number Array as accentMap'
	);

	t.equal(
		clip[1].level,
		70,
		'Clip function uses the provided number Array as accentMap'
	);
	t.end();
});

test('clip should allow setting accentMap with a number Array', (t) => {
	let clip = scribble.clip({
		notes: ['c4'],
		accentMap: [12, 24, 36, 48],
		pattern: 'xxxx'
	});
	t.equal(
		clip[0].level,
		12,
		'Clip function uses the provided number Array as accentMap'
	);

	t.equal(
		clip[3].level,
		48,
		'Clip function uses the provided number Array as accentMap'
	);
	t.end();
});

test('clip should override default params with provided params', (t) => {
	let clip = scribble.clip({
		accentHi: 100
	});
	t.equal(
		clip[0].level,
		100,
		'Clip function uses the provided notes'
	);

	t.end();
});

test('clip should extend notes in case of a longer pattern', (t) => {
	let longerPattern = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx';
	let clip = scribble.clip({
		notes: ['c3', 'd3'],
		pattern: longerPattern
	});
	t.equal(
		clip.length,
		longerPattern.length,
		'Clip function extends notes in case of longer pattern'
	);

	t.end();
});

test('clip should extend notes in case of a longer pattern but retain length of pattern', (t) => {
	let clip = scribble.clip({
		notes: ['c3'],
		pattern: 'xxxxx'
	});
	t.equal(
		clip.length,
		5,
		'Clip function extends notes only up till the length of the pattern'
	);

	t.end();
});

test('clip should allow using chords', (t) => {
	let clip = scribble.clip({
		notes: ['Cmaj', 'Cmin', 'a3'],
		pattern: 'xxx'
	});
	t.equal(
		clip[0].note.join(),
		'c4,e4,g4',
		'Clip allows usage of chords'
	);
	t.equal(
		clip[1].note.join(),
		'c4,eb4,g4',
		'Clip allows usage of chords'
	);
	t.equal(
		clip[2].note.join(),
		'a3',
		'Clip allows usage of chords'
	);

	t.end();
});

test('clip should allow passing arrays of notes as individual notes', (t) => {
	let clip = scribble.clip({
		notes: [['c4', 'e4', 'g4']]
	});
	t.equal(clip[0].note.join(), 'c4,e4,g4', 'Clip allows passing array of notes as individual notes');
	t.end();
});

test('clip should not allow passing arrays of invalid notes as individual notes', (t) => {
	t.throws(function() {
		scribble.clip({
			notes: [['m', 'p', true]]
		});
	});
	t.end();
});

test('clip should increase pattern length if shorter than number of notes', (t) => {
	let clip = scribble.clip({
		notes: ['c4', 'e4', 'g4', 'b4'],
		pattern: 'x'
	});
	t.equal(clip.length, 4, 'Clip adjusts pattern length if less than number of notes');
	t.end();
});

test('clip should arpegiate notes with default settings', (t) => {
	let clip = scribble.clip({
		notes: ['c4', 'e4'],
		pattern: 'x'.repeat(4),
		arpegiate: true
	});
	// The third note in the clip array should be c5 (Note: `clip[n].note` itself is an array for chord support)
	t.equal(clip[2].note[0], 'c5', 'Clip arpegiates notes with default settings');
	t.end();
});

test('clip should arpegiate notes with provided settings', (t) => {
	let clip = scribble.clip({
		notes: ['c4', 'e4'],
		pattern: 'x'.repeat(4),
		arpegiate: {
			steps: 2,
			distance: 1
		}
	});
	// The third note in the clip array should be c#4 (Note: `clip[n].note` itself is an array for chord support)
	t.equal(clip[2].note[0], 'c#4', 'Clip arpegiates notes with provided settings');
	t.end();
});
