/**
 * The Mode module returns a set of notes based on the root note and mode you provide.
 */

module.exports = function(Scribbletune) {


	/**
	 * An array of chromatic notes to filter as per mode patterns
	 * @type {Array}
	 */
	var chromatic = ['c','c#','d','d#','e','f','f#','g', 'g#','a', 'a#','b'];

	//Double up to be able to bleed over to the next octave if required
	chromatic = chromatic.concat(chromatic);

	/**
	 * Available mode patterns
	 * @type {Object}
	 */
	var modePatterns = {

		/******MODES******/

		//Major
		'ionian'        						: [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
		'dorian'        						: [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0],
		'phrygian'      						: [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
		'lydian'        						: [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
		'mixolydian'    						: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
		'aeolian'       						: [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0],
		'locrian'       						: [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],

		//Melodic Minor
		'melodic minor'							: [],
		'phrygian #6'							: [],
		'lydian augmented'						: [],
		'lydian dominant'						: [],
		'fifth mode'							: [],
		'locrian #2'							: [],
		'altered'								: [],

		/******SCALES******/

		//Symmetric
		'whole tone'							: [],
		'diminished whole half'					: [],
		'diminished half whole'					: [],

		//Pentatonic
		'major pentatonic'						: [],
		'minor pentatonic'						: [],
		'suspended pentatonic'					: [],
		'dominant pentatonic'					: [],
		'japanese'								: [],

		//Blues
		'blues'									: [],

		//Bebop
		'bebop major'							: [],
		'bebop minor'							: [],
		'bebop dominant'						: [],
		'bebop melodic minor'					: [],

		//Harmonic
		'harmonic major'						: [],
		'harmonic minor'						: [],
		'double harmonic major'					: [],

		//Exotic
		'hungarian gypsy'						: [],
		'hungarian major'						: [],
		'phrygian dominant'						: [],
		'neapolitan minor'						: [],
		'neapolitan major'						: [],
		'enigmatic'								: [],
		'eight-tone spanish'					: [],
		'balinese pelog'						: [],
		'oriental'								: [],
		'iwato'									: [],
		'yo'									: [],
		'prometheus'							: [],
		'symmetrical'							: [],
		'major locrian'							: [],

		//Miscellaneous
		'augmented'								: [],
		'lydian minor'							: []

	};

	//Ionian and Aeloian modes are also known as Major and Minor scales
	modePatterns.major = modePatterns.ionian;
	modePatterns.minor = modePatterns.aeolian;


	/**
	 * Mode method for Scribbletune
	 */
	var Mode = function() {};


	/**
	 * Return the required mode in the provided root note.
	 * @param  {[type]} root [description]
	 * @param  {[type]} mode [description]
	 * @return {[type]}      [description]
	 */
	Mode.get = function(root, mode) {

		root = root.toLowerCase() || 'c';
		mode = mode.toLowerCase() || 'ionian';


		//Make sure the root is valid
		if(! root.match(/[abcdefg]/) ) {
			throw new Error('Invalid root note!');
		}


		//Make sure if the provided mode is valid
		if(! modePatterns.hasOwnProperty(mode)) {
			throw new Error('Invalid mode!');
		}


		/**
		 * Slice the chromatic notes from the root note onward &
		 * filter it by mode pattern to return the correct notes
		 */
		return chromatic
			.slice(chromatic.indexOf(root))
			.filter(function(el, idx){
				return modePatterns[mode][idx] == 1;
		});

	};

	Scribbletune.mode = Mode;
	
};