const scribble = require('../src/');
let clip = scribble.clip({
	notes: ['c3'],
	pattern: scribble.pattern(4, 'x-x_-xx_'),
	sizzle: true
});

scribble.render(clip);
