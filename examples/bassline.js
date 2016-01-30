var scribble = require('../');

/**
 * Generate a bassline by joining a bunch of clips
 */

var clip = scribble.clip({
	notes: ['c3'],
	pattern: 'x-x_-xx_x-x_-xx_x-x_-xx_x-x_-xx_',
	sizzle: true
});

scribble.render(clip);
