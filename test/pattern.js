'use strict';

const test = require('tape');
const scribble = require('../src/index');

test('Scribbletune::pattern should return a default pattern', (t) => {
	t.equal(
		scribble.pattern(),
		'x_x_x_x_x_x_x_x_',
		'Default pattern generated'
	);
	t.end();
});

test('Scribbletune::pattern should return the correct pattern based on params', (t) => {
	t.equal(
		scribble.pattern(4, 'xxxx'),
		'xxxxxxxxxxxxxxxx',
		'Correct pattern generated'
	);
	t.equal(
		scribble.pattern(2, 'x-x_'),
		'x-x_x-x_',
		'Correct pattern generated'
	);
	t.end();
});
