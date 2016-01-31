var scribble = require('../');

var clip = scribble.clip({
	notes: [
		'c3,e3,g3,b3',
		scribble.chord('f', 'major', 3, true),
		scribble.chord('c', 'major', 3, true),
		scribble.chord('g', 'major', 3, true)
	],
	pattern: 'x_x_x_x_x_x_x_x_',
	sizzle: true
});

scribble.render(clip);
 