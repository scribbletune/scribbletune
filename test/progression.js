'use strict';

const test = require('tape');
const progression = require('../src/progression');

test('Progression::should return correct chords for common progressions', t => {
	t.equal(progression('C4 major', 'I IV V ii'), 'CM-4 FM-4 GM-4 Dm-4', 'should return correct chords for I IV V ii');
	t.equal(progression('D4 minor', 'I IV V ii'), 'DM-4 GM-4 AM-4 Em-4', 'should return correct chords for I IV V ii');
	t.equal(progression('D minor', 'I IV V ii'), 'DM-4 GM-4 AM-4 Em-4', 'should return correct chords when octave is not set');
	t.equal(progression('C4 major', 'I7 ii7'), 'CMaj7-4 Dm7-4', 'should return correct chords for 7th chords');
	t.end();
});
