'use strict';

var test = require('tape');
var scribble = require('../dest/index');

test('Scribbletune::pattern should return a default pattern', function(t) {
	t.equal(
		scribble.pattern(),
		'x_x_x_x_x_x_x_x_',
		'Default pattern generated'
	);
	t.end();
});

test('Scribbletune::pattern should return the correct pattern based on params', function(t) {
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

test('Scribbletune::pattern should shuffle the pattern', function(t) {
	var shuffledPattern = scribble.pattern(4, 'x---', true);
	t.equal(
		shuffledPattern[0] === 'x',
		false,
		'Pattern was shuffled'
	);
	t.end();
});
