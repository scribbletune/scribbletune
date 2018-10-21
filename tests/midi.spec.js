'use strict';
global.window = true;
const fs = require('fs');
const test = require('tape');
const scribble = require('../src/index');

test('Scribbletune::midi', t => {
	let fileExists = false;
	scribble.midi(scribble.clip({
		pattern: 'x[-x]',
		notes: scribble.scale('C4 major')
	}));

	fs.access('./music.mid', fs.F_OK, (err) => {
		if (!err) {
			fileExists = true;
		}
		t.equal(fileExists, true, 'Scribbletune renders a midi file');

		t.end();
	});
});

test('Scribbletune::midi data is returned as byte string if fileName is null', t => {
	const byteString = scribble.midi(scribble.clip({
		pattern: 'x',
		notes: 'c4'
	}), null);

	t.equal(byteString, 'MThd\x00\x00\x00\x06\x00\x00\x00\x01\x00MTrk\x00\x00\x00\r\x00<\x00<Z\x00ÿ/\x00', 'Scribbletune returns byte string');
	t.end();
});
