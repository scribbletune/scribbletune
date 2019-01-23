'use strict';
global.window = true;
const fs = require('fs');
const test = require('tape');
const scribble = require('../src/index');

const fileName = 'music.mid'
const filePath = `./${fileName}`
let scribbleClip = scribble.clip({
	pattern: 'x[-x]',
	notes: scribble.scale('C4 major')
});

test('Scribbletune::midi verifies callback method', t => {
	let fileExists = false;
	try {
		scribble.midi(scribbleClip, fileName, {})
	} catch (err) {
		t.equal(err.message, 'Invalid callback')
	}
	t.end();
});

test('Scribbletune::midi', t => {
	let fileExists = false;

	scribble.midi(scribbleClip, fileName, (err) => {
		// file created asynchronously
		t.equal(err, null)
		fs.access(filePath, fs.F_OK, (err) => {
			if (!err) {
				fileExists = true;
			}
			t.equal(fileExists, true, 'Scribbletune renders a midi file');

			fs.unlinkSync(filePath);
			t.end();
		});
	});
});

test('Scribbletune::midi data is returned as byte string if fileName is null', t => {
	scribbleClip = scribble.clip({
		pattern: 'x',
		notes: 'c4'
	})

	scribble.midi(scribbleClip, null, (err, byteString) => {
		t.equal(err, null)
		t.equal(byteString, 'MThd\x00\x00\x00\x06\x00\x00\x00\x01\x00MTrk\x00\x00\x00\r\x00<\x00<Z\x00ÿ/\x00', 'Scribbletune returns byte string');
		t.end();
	});
});
