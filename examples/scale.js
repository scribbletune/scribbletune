var scribble = require('../');

var clip = scribble.clip({
	notes: scribble.mode('c', 'major', 3),
	pattern: 'x_x_x_x_x_x_x_x_'
});

scribble.render(clip);
