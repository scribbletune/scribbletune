'use strict';

var fs = require('fs');
var test = require('tape');
var scribble = require('../dest/index');

test('Scribbletune::midi', function(t) {
	var fileExists = false;
	scribble.midi(scribble.clip());

	fs.access('./music.mid', fs.F_OK, function(err) {
		if (!err) {
			fileExists = true;
		}
		t.equal(fileExists, true, 'Scribbletune renders a midi file');
		t.end();
	});
});