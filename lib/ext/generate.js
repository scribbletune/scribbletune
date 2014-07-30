/**
 * Scribbletune:Generate
 * -----------------------------------
 * The generate object puts together a clip of notes based on
 * the pattern and notes provided
 */

module.exports = function(Scribbletune) {

	/**
	 * Setup defaults
	 */
	var 
		BAR = 512,			//A single 4x4 bar is 512 ticks
		defaultParams = {
			notes: ['c3'],
			pattern: 'x_______________',
			noteLength: 1/16
		}
	;

	var Generate = function() {};

	/**
	 * Generate a clip based on a pattern, notes and note duration
	 * @param {Array} notes Default: ['c3']
	 * @param {String} pattern Default: 'x________________'
	 * @param {Number} noteLength Default: 1/16 (Valid values: 1/16 (for a SIXTEENTH) 1/8 (for a EIGTH) 1 (for WHOLE) etc)
	 * 	
	 * @return {Array}         An array of notes
	 * 
	 * Sample output: 
	 * [{note:'c3', length:32}, {note:'', length:32}, {note:'d3', length: 64}]
	 */
	Generate.clip = function(params) {

		//Setup a defaults if missing
		params = params || defaultParams;

		//Maybe a params is passed but it misses something
		var 
			notes = params.notes || defaultParams.notes,
			pattern = params.pattern || defaultParams.pattern,
			noteLength = Number(params.noteLength) || defaultParams.noteLength
		;

		//Validate provided notes
		notes.map(function(el){
			if(el.match(/[abcdefg]#?[1-9]/g) === null) throw new Error(el + 'is not a valid note!');
		});

		//Validate provided pattern
		pattern.split('').map(function(el){
			if(el.match(/x|-|_/g) === null) throw new Error(pattern + 'is not a valid pattern!');
		});


		//Ensure notes array has at least as many elements as pattern
		while(notes.length < pattern.length) {
			notes = notes.concat(notes);
		}


		//Use string.replace on pattern to derive an array of note objects
		var clipNotes = [], step = 0;

		/**
		 * Look for a note followed by a interval or sustain
		 * @param  {Regex} match The pattern to match (-, x, x-, x_, x__, x____ etc)
		 * @param  {String} $1   Note on (denoted by x) with or without sustain (denoted by underscore)
		 * @param  {String} $2   Interval (denoted by hyphen)
		 */
		pattern.replace(/(x_*)|(-)/g, function(match, $1, $2){

			if($1) {
				//Found x OR x- OR x__
				clipNotes.push({
					note: notes[step],
					length: noteLength * $1.length * BAR
				});

				//Increment step to proceed in the notes array
				step++;
			}

			if($2) {

				//Found - (hyphen) - note off
				clipNotes.push({
					note: '',
					length: noteLength * BAR
				});
			}

		});

		return clipNotes;
	};

	Scribbletune.generate = Generate;
	
};