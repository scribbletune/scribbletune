/**
 * Modes and scales along with their alternate names where applicable
 * @type {Object}
 */
'use strict';

var modePatterns = {
	/******MODES******/

	// Major
	'ionian': [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
	'dorian': [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0],
	'phrygian': [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
	'lydian': [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
	'mixolydian': [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1],
	'aeolian': [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0],
	'locrian': [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],

	// Melodic Minor
	'melodic minor': [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	'phrygian #6': [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
	'lydian augmented': [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
	'lydian dominant': [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
	'fifth mode': [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
	'locrian #2': [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0],
	'altered': [1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],

	/******SCALES******/

	// Symmetric
	'whole tone': [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
	'diminished whole half': [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0],

	// Pentatonic
	'major pentatonic': [],
	'minor pentatonic': [],
	'suspended pentatonic': [],
	'dominant pentatonic': [],
	'japanese': [],

	// Blues
	'blues': [],

	// Bebop
	'bebop major': [],
	'bebop minor': [],
	'bebop dominant': [],
	'bebop melodic minor': [],

	// Harmonic
	'harmonic major': [],
	'harmonic minor': [],
	'double harmonic major': [],

	// Exotic
	'hungarian gypsy': [],
	'hungarian major': [],
	'phrygian dominant': [],
	'neapolitan minor': [],
	'neapolitan major': [],
	'enigmatic': [],
	'eight-tone spanish': [],
	'balinese pelog': [],
	'oriental': [],
	'iwato': [],
	'yo': [],
	'prometheus': [],
	'symmetrical': [],
	'major locrian': [],

	// Miscellaneous
	'augmented': [],
	'lydian minor': []
};

// Ionian and Aeloian modes are also known as Major and Minor scales
modePatterns['major'] = modePatterns['ionian'];
modePatterns['minor'] = modePatterns['aeolian'];

// Diminished half whole is the same as diminished whole half
modePatterns['diminished half whole'] = modePatterns['diminished whole half'];

// Lydian Dominant is also known as Mixolydian #4 (sharp fourth)
modePatterns['mixolydian #4'] = modePatterns['lydian dominant'];

// Fifth mode is also known as Mixolydian b6 (flat sixth)
modePatterns['mixolydian b6'] = modePatterns['fifth mode'];

// Locrian #2(sharp second) is also known as Aeolian b5 (flat fifth)
modePatterns['locrian #2'] = modePatterns['aeolian b5'];

// ok to send it to the world
module.exports = modePatterns;
