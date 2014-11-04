var _ = require('lodash');
var st = require('../lib/scribbletune');

clip0 = st.generate.clip({
	notes: ['c1'], 
	pattern: 'x---x---x---x---x-x-x-x-x-x-x-x-'
});

var clip1 = st.generate.clip({
	notes: ['c1'], 
	pattern: st.pattern.generate(1, 16, 'x')
});

var clip2 = st.generate.clip({
	notes: ['c1'], 
	pattern: st.pattern.generate(1, 16, 'x'),
	ticks: 256
});

var clip3 = st.generate.clip({
	notes: ['c1'], 
	pattern: st.pattern.generate(1, 32, 'x'),
	ticks: 128
});

st.midi.writeToFile(clip0.concat(clip1, clip2, clip3));