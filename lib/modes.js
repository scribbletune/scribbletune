/*
Modes.js
--------
Generate an array of notes from the provided root note, octave and the mode 
Optionally provide argument to not bleed the mode into the next octave

Example:
mode.get('c', 3, 'ionian')		//returns ['c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3', 'c4']
*/

var _ = require('lodash');

module.exports = {
	chromaticNotes: ['c','c#','d','d#','e','f','f#','g', 'g#','a', 'a#','b'],
	structs: {
		'ionian'        : [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
	  'dorian'        : [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0],
	  'phrygian'      : [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
	  'lydian'        : [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
	  'mixolydian'    : [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
	  'aeolian'       : [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0],
	  'locrian'       : [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0]
	},

	get: function(rootNote, octave, mode, appendNextOctaveNote) {
		//set defaults
		rootNote = rootNote || 'c';
		octave = octave || 3;
		mode = mode || 'ionian';
		appendNextOctaveNote = appendNextOctaveNote || true;

		var chromaticNotesSliced = [];

		//build first part of the mode in the specified octave
		var index = this.chromaticNotes.indexOf(rootNote);
		for(var i=index; i< this.chromaticNotes.length; i++) {
			chromaticNotesSliced.push(this.chromaticNotes[i] + octave);
		}

		//build second part of the mode
		for(var i=0; i< index; i++) {
			chromaticNotesSliced.push(this.chromaticNotes[i] + (octave+1));
		}
		
		var modeArr = [];
		_.each(this.structs[mode], function(noteOnOff, index){
			if(noteOnOff) modeArr.push(chromaticNotesSliced[index]);
		});

		if(appendNextOctaveNote) modeArr.push(rootNote + (octave+1));

	  return modeArr;
	}
}