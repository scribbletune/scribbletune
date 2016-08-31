const scribble = require('../src/');
let clip = scribble.clip({
	notes: scribble.mode('c', 'major', 3),
	pattern: scribble.pattern(8, 'x_')
});

scribble.render(clip);
