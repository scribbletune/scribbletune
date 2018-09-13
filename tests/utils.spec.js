'use strict';

const test = require('tape');
const utils = require('../src/utils');

test('Utils::shuffle should rearrange array', t => {
	let shuffledPattern = utils.shuffle(['x', '_', '-', '-']);
	t.equal(
		shuffledPattern[0] === 'x' && shuffledPattern[0] === '_',
		false,
		'Pattern was shuffled'
	);

	t.end();
});

test('Utils::expandStr should expand a tidal pattern correctly', t => {
	t.equal(utils.expandStr('x')[0], 'x', 'should expand quarter note correctly');
	t.equal(utils.expandStr('xx')[1], 'x', 'should expand quarter note correctly');
	t.equal(utils.expandStr('x[-x]')[1][0], '-', 'should expand quarter note correctly');
	t.equal(utils.expandStr('x[-x[-x]]')[1][2][1], 'x', 'should expand quarter note correctly');
	t.end();
});

test('Utils::sizzleMap should return a sizzled map', t => {
	t.equal(utils.sizzleMap()[0], 63, 'should sizzle with 127 as default hi');
	t.equal(utils.sizzleMap()[1], 90, 'should sizzle with 127 as default hi');

	t.end();
});

test('Utils::isNote should identify a note correctly', t => {
	t.equal(utils.isNote('Fg'), false, 'should invalidate incorrect notes');
	t.equal(utils.isNote('F4'), true, 'should invalidate incorrect notes');
	t.equal(utils.isNote('j'), false, 'should invalidate incorrect notes');
	t.equal(utils.isNote('CM'), false, 'should invalidate incorrect notes');
	t.equal(utils.isNote('C4th'), false, 'should invalidate incorrect notes');

	t.end();
});
