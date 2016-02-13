var scribble = require('../dest/');

var clip = scribble.clip({
	notes: ['c2'],
	pattern: 'x---x---x---x---'
});

scribble.render(clip);
