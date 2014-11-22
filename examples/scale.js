var scribble = require('../lib/scribbletune');

var clip = scribble.clip({
	notes: scribble.mode('c', 'major', 3), 
	pattern: 'xxxxxxxx'
});

scribble.render(clip);