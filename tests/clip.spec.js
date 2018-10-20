'use strict';
global.window = true;
const test = require('tape');
const scribble = require('../src/index');

test('clip should use provided notes', t => {
	t.equal(
		scribble.clip({
			notes: ['D3']
		})[0].note[0],
		'D3',
		'Clip function uses the provided notes'
	);

	t.end();
});

test('clip should allow uppercase notes', t => {
	t.equal(
		scribble.clip({
			notes: 'D3'
		})[0].note[0],
		'D3',
		'Clip function uses the notes entered as uppercase'
	);

	t.end();
});

test('clip should throw an error in case of invalid notes', t => {
	t.throws(function() {
		scribble.clip({notes: ['k1']});
	}, /TypeError/, 'should throw an error in case of invalid notes');

	t.end();
});

test('clip should allow passing a string of notes', t => {
	let clip = scribble.clip({
		notes: 'C4 D4 E4',
		pattern: 'xxx'
	});
	t.equal(clip[0].note[0], 'C4', 'Clip uses provided notes as a string');
	t.equal(clip[1].note[0], 'D4', 'Clip uses provided notes as a string');
	t.equal(clip[2].note[0], 'E4', 'Clip uses provided notes as a string');
	t.end();
});

test('clip should allow passing a string of notes with chords', t => {
	let clip = scribble.clip({
		notes: 'C4 DM E4',
		pattern: 'xxx'
	});
	t.equal(clip[0].note[0], 'C4', 'Clip uses provided notes as a string');
	t.equal(clip[1].note[0], 'D4', 'Clip uses provided notes as a string');
	t.equal(clip[1].note[1], 'F#4', 'Clip uses provided notes as a string');
	t.equal(clip[1].note[2], 'A4', 'Clip uses provided notes as a string');
	t.equal(clip[2].note[0], 'E4', 'Clip uses provided notes as a string');
	t.end();
});

test('clip should allow passing a string of notes with chords with octave', t => {
	let clip = scribble.clip({
		notes: 'C4 DM-5 E4',
		pattern: 'xxx'
	});
	t.equal(clip[0].note[0], 'C4', 'Clip uses provided notes as a string');
	t.equal(clip[1].note[0], 'D5', 'Clip uses provided notes as a string');
	t.equal(clip[1].note[1], 'F#5', 'Clip uses provided notes as a string');
	t.equal(clip[1].note[2], 'A5', 'Clip uses provided notes as a string');
	t.equal(clip[2].note[0], 'E4', 'Clip uses provided notes as a string');
	t.end();
});

test('clip should validate provided notes & pattern using default notes and patterns in their absence', t => {
	let clip;
	t.throws(function() {
		scribble.clip({pattern: 'kkjd'});
	}, /AssertionError/, 'Invalid pattern should throw an error!');
	t.throws(function() {
		scribble.clip({notes: ['k1']});
	}, /TypeError/, 'Invalid notes should throw an error!');

	clip = scribble.clip();
	t.equal(clip[0].length, 128, 'Clip uses a default pattern');
	t.equal(clip[0].note[0], 'C4', 'Clip uses default note and octave');

	t.end();
});

test('clip should shuffle provided notes', t => {
	let clip = scribble.clip({
		notes: scribble.scale('C3 major'),
		pattern: 'xxxx',
		shuffle: true
	});

	t.equal(
		clip[0].note[0] === 'C3' && clip[0].note[1] === 'D3',
		false,
		'Clip function uses the provided notes'
	);

	t.end();
});

test.skip('clip should allow setting accentMap with a x-_ string', t => {
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

test.skip('clip should allow setting accentMap with a number Array', t => {
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

test('clip should override default params with provided params', t => {
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

test('clip should extend notes in case of a longer pattern', t => {
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

test('clip should extend notes in case of a longer pattern but retain length of pattern', t => {
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

test('clip should allow using chords', t => {
	let clip = scribble.clip({
		notes: ['CM', 'Cm', 'A3'],
		pattern: 'xxx'
	});
	t.equal(
		clip[0].note.join(),
		'C4,E4,G4',
		'Clip allows usage of chords'
	);
	t.equal(
		clip[1].note.join(),
		'C4,Eb4,G4',
		'Clip allows usage of chords'
	);
	t.equal(
		clip[2].note.join(),
		'A3',
		'Clip allows usage of chords'
	);

	t.end();
});

test('clip should allow passing arrays of notes as individual notes', t => {
	let clip = scribble.clip({
		notes: [['c4', 'e4', 'g4']]
	});
	t.equal(clip[0].note.join(), 'c4,e4,g4', 'Clip allows passing array of notes as individual notes');
	t.end();
});

test('clip should allow passing arrays of notes along with individual notes', t => {
	let clip = scribble.clip({
		notes: [['c4', 'e4', 'g4'], 'e3'],
		pattern: 'xx'
	});
	t.equal(clip[0].note.join(), 'c4,e4,g4', 'Clip allows passing array of notes');
	t.equal(clip[1].note.join(), 'e3', 'Clip allows passing individual notes');
	t.end();
});

test('clip should not allow passing arrays of invalid notes as individual notes', t => {
	t.throws(function() {
		scribble.clip({
			notes: [['m', 'p', true]]
		});
	});
	t.end();
});

test.skip('clip should increase pattern length if shorter than number of notes', t => {
	let clip = scribble.clip({
		notes: ['c4', 'e4', 'g4', 'b4'],
		pattern: 'x'
	});
	t.equal(clip.length, 4, 'Clip adjusts pattern length if less than number of notes');
	t.end();
});

test('clip should accept tidal pattern format', t => {
	let clip = scribble.clip({
		pattern: 'x[-x]x[x[xx]]',
		notes: 'c4'
	});
	t.equal(clip[0].length, 128, 'Clip accepts tidal pattern format correctly');
	t.equal(clip[2].length, 64, 'Clip accepts tidal pattern for subdivision format correctly');
	t.equal(clip[6].length, 32, 'Clip accepts tidal pattern for subdivision format correctly');
	t.end();
});

test('clip should accept tidal pattern format with underscores', t => {
	let clip = scribble.clip({
		pattern: 'x___',
		notes: 'c4'
	});
	t.equal(clip[0].length, 512, 'Clip accepts tidal pattern format correctly');

	t.end();
});
