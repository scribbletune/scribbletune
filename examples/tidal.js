'use strict';

const scribble = require('../src/');

let clip = scribble.clip2({
	pattern: 'xxx',
	notes: [['C4', 'E4', 'G4'], 'FMaj7', 'e3']
});

scribble.midi(clip);
