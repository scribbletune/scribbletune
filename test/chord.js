'use strict';

const test = require('tape');
const scribble = require('../src/index');

test('chord should identify numerical chords with a suffix of `th`', t => {
	const c4th = scribble.chord('C4th');
	t.equal(c4th[0], 'C4', 'Chord method uses numerical chords with a suffix');
	t.equal(c4th[1], 'F4', 'Chord method uses numerical chords with a suffix');
	t.equal(c4th[2], 'Bb4', 'Chord method uses numerical chords with a suffix');
	t.equal(c4th[3], 'Eb5', 'Chord method uses numerical chords with a suffix');

	t.end();
});

test('chord should identify numerical chords with a suffix of `th` and octave', t => {
	const d4th = scribble.chord('D4th-5');
	t.equal(d4th[0], 'D5', 'Chord method uses numerical chords with a suffix');
	t.equal(d4th[1], 'G5', 'Chord method uses numerical chords with a suffix');
	t.equal(d4th[2], 'C6', 'Chord method uses numerical chords with a suffix');
	t.equal(d4th[3], 'F6', 'Chord method uses numerical chords with a suffix');

	t.end();
});

test('chords method should return numerical chords with a suffix of `th`', t => {
	const chords = scribble.chords();
	t.equal(chords.indexOf('5'), -1, 'Numerical chords must not exist in chord list');
	t.equal(chords.indexOf('5th') > 0, true, 'Numerical chords must not exist in chord list');
	t.equal(chords.indexOf('4'), -1, 'Numerical chords must not exist in chord list');
	t.equal(chords.indexOf('4th') > 0, true, 'Numerical chords must not exist in chord list');
	t.equal(chords.indexOf('11'), -1, 'Numerical chords must not exist in chord list');
	t.equal(chords.indexOf('11th') > 0, true, 'Numerical chords must not exist in chord list');
	t.equal(chords.indexOf('13'), -1, 'Numerical chords must not exist in chord list');
	t.equal(chords.indexOf('13th') > 0, true, 'Numerical chords must not exist in chord list');

	t.end();
});