/**
 * The Mode module returns a set of notes based on the root note and mode you provide.
 */


var modes = require('./modes'); //available modes and scales

/**
 * Augment the provided object with the mode functionality
 */
module.exports = function(Scribbletune) {

	/**
	 * Create an array of chromatic notes to filter as per mode patterns.
	 * Basically we ll walk thru the chromatic notes with a mode map to
	 * pick required notes from the requested mode for the requested root note.
	 * @type {Array}
	 */
	var chromaticNotes = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#','a', 'a#', 'b'];


	/**
	 * Mode method for Scribbletune
	 */
	var Mode = function() {};


	/**
	 * Return the required mode in the provided root note.
	 * @param  {String} root The root note. Example: 'c', 'f#' etc. Default: 'c'
	 * @param  {String} mode The name of the mode or scale. Example: 'ionian' or 'major' or 'pentatonic'. Default: 'ionian'
	 * @return {Array}		 Returns an array of notes. Example: ['c', 'd', 'e', 'f', 'g', 'a', 'b']
	 */
	Mode.get = function(root, mode, octave) {

		root = root && root.toLowerCase() || 'c';
		mode = mode && mode.toLowerCase() || 'ionian';
		octave = octave || 3;

		// Append octave to chromatic notes
		var chromatic =
			chromaticNotes
				.map( function(el, idx) { return el + octave } )
				// Double up with the next octave to be able to bleed over
				.concat(
					chromaticNotes
						.map( function(el, idx) { return el + (octave + 1) } )
				);



		//Make sure the root is valid [abcdefg] optionally followed by #
		if(! root.match(/[abcdefg]#?/) ) {
			throw new Error('Invalid root note!');
		}


		//Make sure if the provided mode is valid
		if(! modes.hasOwnProperty(mode)) {
			throw new Error('Invalid mode!');
		}


		/**
		 * Slice the chromatic notes from the root note onward &
		 * filter it by mode pattern to return the correct notes
		 */
		return chromatic
			.slice(chromatic.indexOf(root + octave))
			.filter(function(el, idx){
				return modes[mode][idx] == 1;
		});

	};

	Scribbletune.mode = Mode.get;

};
