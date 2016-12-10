'use strict';

const test = require('tape');
const utils = require('../src/utils');

test('Utils::shuffle should rearrange array', (t) => {
	let shuffledPattern = utils.shuffle(['x', '_', '-', '-']);
	t.equal(
		shuffledPattern[0] === 'x' && shuffledPattern[0] === '_',
		false,
		'Pattern was shuffled'
	);
	t.end();
});
