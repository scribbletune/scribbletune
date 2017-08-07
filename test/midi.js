'use strict';

const fs = require('fs');
const test = require('tape');
var path = require('path');
 
const scribble = require('../src/index');
 
test('Scribbletune::midi', (t) => {
	let fileExists = false;
	scribble.midi(scribble.clip());
	
	let outputFile = path.join(__dirname, '../Output/music.mid');
 
	fs.access(outputFile, fs.F_OK, (err) => {
		if (!err) {
			fileExists = true;
		}
		t.equal(fileExists, true, 'Scribbletune renders a midi file');
		t.end();
	});
});


