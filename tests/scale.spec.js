'use strict';

const test = require('tape');
const scribble = require('../src/index');

test('scale should return the correct scale from tonal', t => {
  t.equal(
    scribble.scale('C4 major').join(),
    'C4,D4,E4,F4,G4,A4,B4',
    'Scale function returns the correct notes for a scale'
  );

  t.equal(
    scribble.scale('c4 major').join(),
    'C4,D4,E4,F4,G4,A4,B4',
    'Scale function returns the correct notes for a scale with lower case note'
  );

  t.equal(
    scribble.scale('c4 Major').join(),
    'C4,D4,E4,F4,G4,A4,B4',
    'Scale function accepts case insensitive scale name'
  );

  t.equal(
    scribble.scale('Db4 minor').join(),
    'Db4,Eb4,E4,Gb4,Ab4,A4,B4',
    'Scale returns simplified names of notes' // tonal returns notes Fb4 instead of E
  );

  t.end();
});