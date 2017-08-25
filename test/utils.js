'use strict';

const test = require('tape');
const utils = require('../src/utils');

test('Utils::sizzle map does not generate higher than maxValue param', (t) => {
	let maxValue = 60;
	let sizzledPattern = utils.sizzleMap(60);
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

test('Utils::doubleArrayTillMatchLength should double the array until it has reached 12 in length', (t) => {
	let arr = ['1', '2', '3'];
	arr = utils.doubleArrayTillMatchLength(arr, 12);
	
	t.equal(
		arr.length == 12,
		true,
		'Array was doubled until 12 length'
	);
	t.end();
});

test('Utils::doesArrayContainAnArray return the correct value with both types of arrays', (t) => {
	let arrTrue  = [['1'], '2'];
	let arrFalse = ['1', '2'];
	let yesArray = utils.doesArrayContainAnArray(arrTrue);
	let noArray  = utils.doesArrayContainAnArray(arrFalse);
	
	t.equal(
		yesArray == true && noArray == false,
		true,
		'Array was doubled until 12 length'
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
