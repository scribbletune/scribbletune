'use strict';

const fs = require('fs');
const test = require('tape');
const scribble = require('../src/index');
var workingDir = path.dirname(require.main.filename);

test('Scribbletune::midi', (t) => {
	let fileExists = false;
	scribble.midi(scribble.clip());

	fs.access(workingDir+'/output/music.mid', fs.F_OK, (err) => {
		if (!err) {
			fileExists = true;
		}
		t.equal(fileExists, true, 'Scribbletune renders a midi file');
		t.end();
	});
});
