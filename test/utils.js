'use strict';

const test = require('tape');
const utils = require('../src/utils');

test('Utils::sizzle map does not generate higher than maxValue param', (t) => {
	let maxValue = 60;
	let sizzledPattern = utils.sizzleMap(60);
	console.log ('KRIS: ', sizzledPattern);
	let isUnderMax = sizzledPattern.every((sizz) => {
		return sizz <= maxValue;
	});
	t.equal(
		isUnderMax,
		true,
		'No value in sizzled map was over max value'
	);
	t.end();
});

test('Utils::shuffle should rearrange array', (t) => {
	let shuffledPattern = utils.shuffle(['x', '_', '-', '-']);
	t.equal(
		shuffledPattern[0] === 'x' && shuffledPattern[0] === '_',
		false,
		'Pattern was shuffled'
	);
	t.end();
});
