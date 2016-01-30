var scribble = require('../');

var clip = scribble.clip({
	notes: ['c3,e3,g3', 'f3,c4,g4', 'e3,g3,c4', 'f3,c4,g4'],
	pattern: 'x_x_x_x_x_x_x_x_',
	sizzle: true
});

scribble.render(clip);
