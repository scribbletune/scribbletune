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


		/*ERROR HANDLING*/
		/*validate root note - must be in the string of abcdefg*/
		if(rootNote.indexOf('abcdefg') < 0) throw new Error('Invalid root note!');
		/*validate mode*/
		if (!this.pattern[mode]) 						throw new Error('Invalid mode!');
		/*check if octave is a number*/
		if(isNaN(octave)) 									throw new Error('You must specify a number for octave');
		/*check if octave is in the range of 1 to 8*/
		if(octave < 1 || octave > 8) 				throw new Error('Octave must be in the range of 1 to 8!');


		/*
		 * Create chromatic scale starting from the specified root note
		 * So if D is the specified root note,
		 * then generate chromatic scale from D... which is d,d#,e,f,f#...c#
		 */
		var chromaticFromRoot = this.chromaticNotes
																.slice(this.chromaticNotes.indexOf(rootNote))
																.concat(this.chromaticNotes.slice(0, this.chromaticNotes.indexOf(rootNote)));


		/*
		 * Filter notes as per pattern and append octave to each element of the array
		 */
		var modeArr = [];
		this.pattern[mode].forEach(function(noteOnOff, index){
			if(noteOnOff) modeArr.push(chromaticFromRoot[index] + octave);
		});

		/*
		 * A mode or scale generally ends in the next octave of the root note
		 * Do this only if not specified otherwise.
		 */
		if(appendNextOctaveNote) modeArr.push(rootNote + (octave+1));

	  return modeArr;
	}
}

module.exports = Modes;