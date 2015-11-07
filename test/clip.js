'use strict';

var test = require('tape'),
	st = require('../');

test('clip should use provided notes', function(t) {
	t.equal(
		st.clip({
			notes: ['d3']
		})[0].note,
		'd3',
		'Clip function uses the provided notes'
	);

	t.end();
});

test('clip show throw an error in case of invalid notes', function(t) {
	t.throws(function() {
		st.clip({notes: ['k1']});
	});

	t.end();
});

test('clip should validate provided notes & pattern using default notes and patterns in their absence', function(t) {
	var clip;
	t.throws(function() {
		st.clip({pattern: 'kkjd'});
	});
	t.throws(function() {
		st.clip({notes: ['k1']});
	});
	clip = st.clip({pattern: 'x_______x-------'}),
	t.equal(clip[0].length, 256, 'Clip uses provided pattern');
	t.equal(clip[8].length, 32, 'Clip uses provided pattern');
	t.equal(clip[0].note, 'c3', 'Clip uses default note and octave');

	clip = st.clip();
	t.equal(clip[0].length, 512, 'Clip uses a default pattern');
	t.equal(clip[0].note, 'c3', 'Clip uses default note and octave');

	t.end();
});

