/**
 * Modes and scales along with their alternate names where applicable
 * @type {Object}
 */
'use strict';

const modes = {

	// Common
	'ionian': [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
	'dorian': [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0],
	'phrygian': [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
	'lydian': [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
	'mixolydian': [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
	'aeolian': [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0],
	'locrian': [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],

	// Melodic Minor
	'melodic minor': [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	'phrygian #6': [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
	'lydian augmented': [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
	'lydian dominant': [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0],
	'fifth mode': [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
	'locrian #2': [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0],
	'altered': [1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],

	// Symmetric
	'whole tone': [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
	'diminished whole half': [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],

	// Pentatonic
	'major pentatonic': [1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
	'minor pentatonic': [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
	'suspended pentatonic': [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
	'dominant pentatonic': [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1],
	'japanese': [1, 1, 0, 0, 0, 1, 0, 1, 1, 0],

	// Blues
	'blues': [1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0],

	// Bebop
	'bebop major': [1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
	'bebop minor': [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
	'bebop dominant': [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1],
	'bebop melodic minor': [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],

	// Harmonic
	'harmonic major': [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1],
	'harmonic minor': [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
	'double harmonic major': [1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1],

	// Exotic
	'hungarian gypsy': [1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1],
	'hungarian major': [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1],
	'phrygian dominant': [1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
	'neapolitan minor': [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1],
	'neapolitan major': [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	'enigmatic': [1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1],
	'eight-tone spanish': [1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
	'balinese pelog': [1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
	'oriental': [1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
	'iwato': [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
	'yo': [1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
	'prometheus': [1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
	'symmetrical': [1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0],
	'major locrian': [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],

	// Miscellaneous
	'augmented': [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
	'lydian minor': [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0]
};

// Ionian and Aeloian modes are also known as Major and Minor scales
modes['major'] = modes['ionian'];
modes['minor'] = modes['aeolian'];

// Diminished half whole is the same as diminished whole half
modes['diminished half whole'] = modes['diminished whole half'];

// Lydian Dominant is also known as Mixolydian #4 (sharp fourth)
modes['mixolydian #4'] = modes['lydian dominant'];

// Fifth mode is also known as Mixolydian b6 (flat sixth)
modes['mixolydian b6'] = modes['fifth mode'];

// Locrian #2(sharp second) is also known as Aeolian b5 (flat fifth)
modes['aeolian b5'] = modes['locrian #2'];

module.exports = modes;
