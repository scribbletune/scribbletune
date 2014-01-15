/*
Modes.js
--------
Generate an array of notes from the provided root note, octave and the mode 
Optionally provide argument to not bleed the mode into the next octave

Example:
mode.get('c', 3, 'ionian')		//returns ['c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3', 'c4']
*/

var Modes = {
	chromaticNotes: ['c','c#','d','d#','e','f','f#','g', 'g#','a', 'a#','b'],
	pattern: {
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

		if (!this.pattern[mode]) {
			throw new Error('Wrong mode!');
		}

		//create chromatic scale starting from the specified root note
		//so if D is the specified root note, then generate chromatic scale from D... which is d,d#,e,f,f#...c#
		var chromaticFromRoot = this.chromaticNotes
								.slice(this.chromaticNotes.indexOf(rootNote))
								.concat(this.chromaticNotes.slice(0, this.chromaticNotes.indexOf(rootNote)));

		//filter notes as per pattern and append octave to each element of the array
		var modeArr = [];
		this.pattern[mode].forEach(function(noteOnOff, index){
			if(noteOnOff) modeArr.push(chromaticFromRoot[index] + octave);
		});

		if(appendNextOctaveNote) modeArr.push(rootNote + (octave+1));

	  return modeArr;
	}
}

module.exports = Modes;