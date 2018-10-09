'use strict';

const test = require('tape');
const progression = require('../src/progression');

test('Progression::get should return correct chords for common progressions', t => {
	t.equal(progression.getChords('C4 major', 'I IV V ii'), 'CM-4 FM-4 GM-4 Dm-4', 'should return correct chords for I IV V ii');
	t.equal(progression.getChords('D4 minor', 'I IV V ii'), 'DM-4 GM-4 AM-4 Em-4', 'should return correct chords for I IV V ii');
	t.equal(progression.getChords('D minor', 'I IV V ii'), 'DM-4 GM-4 AM-4 Em-4', 'should return correct chords when octave is not set');
	t.equal(progression.getChords('C4 major', 'I7 ii7'), 'CMaj7-4 Dm7-4', 'should return correct chords for 7th chords');
  t.equal(progression.getChords('C4 major', 'I ii° VI°'), 'CM-4 Dm7b5-4 AM7b5-4', 'should return correct chords for 7th chords');
	t.end();
});

test('Progression::arpegiate should return correct notes for progressions', t => {
  t.equal(progression.arpegiate('CM-4 FM-4')[0], 'C4', 'should return correct notes');
  t.equal(progression.arpegiate({
    chords: 'CM-4 FM-4',
    order: '76543210'
  })[0], 'E6', 'should return correct notes when order is changed');
  t.end();
});
