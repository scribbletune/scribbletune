const scribble = require('../src/');
let clip = scribble.clip({
	notes: ['c4'],
	pattern: 'xxxxxxxxxxxxxxxx',
	sizzle: true
});

scribble.render(clip);
