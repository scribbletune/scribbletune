var _ = require('lodash');
var scribble = require('../lib/');
var clip = scribble.clip({
	notes: [
		scribble.chord('f#', 'minor', 3),
		scribble.chord('c#', 'minor', 3),
		scribble.chord('d', 'major', 3),
		scribble.chord('b', 'minor', 3),
		scribble.chord('e', 'major', 3),
		scribble.chord('a', 'major', 3),
		scribble.chord('d', 'major', 3),
		scribble.chord('c#', 'minor', 3),
		scribble.chord('a', 'major', 3)
	],
	pattern: 'x_______x_______x_______________x_______x_______x_______________________________________________x_______x_______x_______________',
	sizzle: true
});  

scribble.render(clip);
 