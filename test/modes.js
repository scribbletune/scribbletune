var test = require('tape'),
	st = require('../lib/scribbletune');

test('Scribbletune::modes', function(t) {
	t.equal(
		st.mode('c', 'ionian').join(''),
		'c3d3e3f3g3a3b3',
		'C Ionian is C D E F G A B'
	);
	t.equal(
		st.mode('d', 'dorian').join(''),
		'd3e3f3g3a3b3c4',
		'D Dorian is D E F G A B C'
	);
	t.equal(
		st.mode('e', 'phrygian').join(''),
		'e3f3g3a3b3c4d4',
		'E Phrygian is E F G A B C D'
	);
	t.equal(
		st.mode('f', 'lydian').join(''),
		'f3g3a3b3c4d4e4',
		'F Lydian is F G A B C D E'
	);
	t.equal(
		st.mode('g', 'mixolydian').join(''),
		'g3a3b3c4d4e4f4',
		'G Mixolydian is G A B C D E F'
	);
	t.equal(
		st.mode('a', 'aeolian').join(''),
		'a3b3c4d4e4f4g4',
		'A Aeolian is A B C D E F G '
	);
	t.equal(
		st.mode('b', 'locrian').join(''),
		'b3c4d4e4f4g4a4',
		'B Locrian is B C D E F G A'
	);
	t.end();
});
