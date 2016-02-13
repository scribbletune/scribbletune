var scribble = require('../lib/');

var clip = scribble.clip({
	notes: ['c2'],
	pattern: 'x---x---x---x---'
});

scribble.render(clip);
