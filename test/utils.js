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

test('Utils::stringToChordArr should convert named chord to array', (t) => {
	let chord = utils.stringToChordArr('CMaj');
	t.equal(
		chord.join() === 'C,major,4',
		true,
		'Chord converted correctly for C Major'
	);

	chord = utils.stringToChordArr('cm');
	t.equal(
		chord.join() === 'c,minor,4',
		true,
		'Chord converted correctly for C Minor'
	);

	chord = utils.stringToChordArr('FMaj7');
	t.equal(
		chord.join() === 'F,major,4,7',
		true,
		'Chord converted correctly for F Major 7'
	);

	chord = utils.stringToChordArr('Dm-3');
	t.equal(
		chord.join() === 'D,minor,3',
		true,
		'Chord converted correctly for D Minor in the 3rd octave'
	);

	t.end();
});