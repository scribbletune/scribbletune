var _ = require('lodash');
var scribbletune = require('../lib/scribbletune');

//start with a bunch of notes
var notes = 'd#,g,f#'.split(',');

//set a mode to be used
var modesArr= ['dorian', 'aeolian'];

//set an octave
var octave = 3;

//generate an array of arrays of ionian modes of the notes
var modesArr = notes.map(function(el, idx){
	return scribbletune.mode.get(el, modesArr[_.random(0, modesArr.length - 1)]);
});

//identify the common notes in the modes generated
var intersectedModes = _.intersection(modesArr[0]);
var notesWithOctaves = notes.map(function(el){ return el + octave });

var notesArr = _.union(notesWithOctaves, intersectedModes);


var clip = 
	scribbletune.generate.clip({
		notes: notesArr, 
		//pattern: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		//pattern: 'x-------x-----x-x-------------x-',
		pattern: 'xxxxx-x--xx-xx-xxxx---x-xx-xxxxx'.replace(/-/g, '_'),
		sizzle: true,
		sizzleMap: 'x--------x--------x----x----x---',
		//sizzleMap: 'x-------x-----x-x-------------x-'
		shuffle: true
	});



scribbletune.midi.writeToFile(clip);