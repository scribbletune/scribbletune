'use strict';

const fs = require('fs');
const test = require('tape');
const scribble = require('../src/index');

test('Scribbletune::midi should merge multiple clips', (t) => {
	let fileExists = false;
	let clip1 = scribble.clip();
	let clip2 = scribble.clip();

	scribble.midi([ clip1, clip2 ], 'midiClipMerge.mid');

	fs.access('./midiClipMerge.mid', fs.F_OK, (err) => {
		if (!err) {
			fileExists = true;
		}
		t.equal(fileExists, true, 'Scribbletune renders a midi file');
		t.end();
	});
});

test('Scribbletune::midi should generate midi file if note passed in is not in array', (t) => {
	let fileExists = false;

	let clipString = scribble.clip({
		notes: 'c2',
		pattern: 'x--'
	});

	scribble.midi(clipString, 'ClipNoteAsString.mid');

	fs.access('./ClipNoteAsString.mid', fs.F_OK, (err) => {
		if (!err) {
			fileExists = true;
		}
		t.equal(fileExists, true, 'Scribbletune renders a midi file');
		t.end();
	});
});

// Added to get higher test coverage. Should not be a senario that is encountered often.
test('Scribbletune::midi should generate midi file if array of clips contains clips and/or notes', (t) => {
	let fileExists = false;

	let kick = scribble.clip({
		notes: ['c2'],
		pattern: 'x--'.repeat(4)
	});

	let snare = scribble.clip({
		notes: 'd2',
		pattern: '----x---'
	});

	let highHat = scribble.clip({
		notes: 'f#2',
		pattern: 'x-x-x-x-'
	});

	scribble.midi([kick, snare, highHat[0]], '01-drumKit.mid');

	fs.access('./01-drumKit.mid', fs.F_OK, (err) => {
		if (!err) {
			fileExists = true;
		}
		t.equal(fileExists, true, 'Scribbletune renders a midi file');
		t.end();
	});
});

test('Scribbletune::midi', (t) => {
	let fileExists = false;
	scribble.midi(scribble.clip());

	fs.access('./music.mid', fs.F_OK, (err) => {
		if (!err) {
			fileExists = true;
		}
		t.equal(fileExists, true, 'Scribbletune renders a midi file');
		t.end();
	});
});
