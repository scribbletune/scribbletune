var scribble = require('../dest/');
var clip = scribble.clip({
	notes: ['c4'],
	pattern: 'xxxxxxxxxxxxxxxx',
	sizzle: true
});

scribble.render(clip);
