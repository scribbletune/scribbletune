'use strict';

const fs = require('fs');
const test = require('tape');

const scribble = require('../src/index');
  var getDirName = require('path').dirname;


test('Scribbletune::midi', (t) => {
	let fileExists = false;
	scribble.midi(scribble.clip());
    var workingDir = getDirName(require.main.filename);
  
	fs.access(workingDir + '/Output/music.mid', fs.F_OK, (err) => {
		if (!err) {
			fileExists = true;
		}
		t.equal(fileExists, true, 'Scribbletune renders a midi file');
		t.end();
	});
});
