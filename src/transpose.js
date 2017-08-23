'use strict';
const assert = require('assert');
const defaultMiddleC = 4;

/**
 * Transposition is a global that subtracts the provided value for middle C from the default middle C
 * For e.g. if you set the middle C to 5, the transposition will be be set to defaultMiddleC - 5 = -1.
 * While writing to MIDI, this "transposition" will be considered and a note entered as C4
 * will appear as C4 in Ableton Live or Propellerhead Reason which consider C3 as the middle C. 
 * Without this adjustment it will look like C3 in most modern music creation software!
 */
let transposition = 0;

/**
 * startOctave is a global to be able to transpose an array of notes relative to the octave of the first note
 * in the array. (TODO: Ideally we need to come up with a better way than have this global var here)
 */
let startOctave;

/**
 * Takes an integer and transposes all notes to a different middle C octave.
 * @param {Integer} octave		The new octave for middle C.
 */
function setMiddleC(octave) {
	octave = Number(octave);
	assert(Number.isInteger(octave), 'Octave must be an integer to set middle C.');
	transposition = octave - defaultMiddleC;
}

/**
 * Takes an octave and transposes it to the octave determined by transposition
 * @param {Integer/String} initialOctave	The initial octave
 * @return {Integer} The correctly transposed octave
 */
function transposeOctave(initialOctave) {
	initialOctave = Number(initialOctave);	// Not using parseInt as it will convert invalid input such as 3.3 to 3
	assert(Number.isInteger(initialOctave), 'Initial Octave must be an integer.');
	return initialOctave += transposition;
}

/**
 * Takes a single note or array of notes and transposes into the octave given by transposition or the octave param
 * @param {String/Array} noteArg		The Array/String contaning the note(s)
 * @param {Integer} octave The octave to transpose to  
 * @return {String(s)} 	The correctly transposed note(s)
 */
const transposeNote = (noteArg, octave) => {
	assert(typeof noteArg === 'string' || Array.isArray(noteArg));
	assert(Number.isInteger(octave) || octave === undefined, 'Octave, if defined, must be an integer');
	if(typeof noteArg === 'string') {
		// If a single note was passed, transpose the single note
		return _transposeSingle(noteArg, 0, octave);
	} else {
		// If an array of notes were passed, transpose every note in the array relative to the octave of the first note
		return noteArg.map((n, i) => _transposeSingle(n, i, octave));
	}
}
/**
 * Private method to transpose a single note to the correct octave determined by transposition or the octave argument
 * @param {String} note     Note to be transposed
 * @param {Integer} noteIndex   Index in note array (if noteIndex is 0, we will use the octave of that note as a ref)
 * @param {Integer} octave Optional octave to transpose to  
 * @return {String} Transposed note
 */
const _transposeSingle = (note, noteIndex, octave) => {
	assert(typeof note === 'string', 'Note must be a string.');

	// Get the root from the note, for e.g. get C from C4
	let root = note.replace(/\d/g, '');
    
	// Get the octave from the note, for e.g. get 4 from C4
	let oct = +note.replace(/[^\d]/g, '');

	// In case of an Array of notes, consider the first note's octave as the relative octave
	// For e.g. If the input was ['c4', 'd5', 'e6'] with octave set to 6, dont convert it to ['c6', 'd6', 'e6']
	// Instead, convert it to ['c6', 'd7', 'e8']. Basically bump octave relative to the first note in the array
	// It took the first note 2 octaves to get to 6 from 4, hence move the rest of the notes up by 2 octaves only
	// This is helpful for transposing chords & melodies.
	if (noteIndex === 0) {
		startOctave = oct;
	}

	if (octave) {
		oct = octave + (oct - startOctave);
	} else {
		oct += transposition;
	}
	// Transpose the octave
	return root + oct;
}
module.exports = {setMiddleC, transposeNote, transposeOctave, defaultMiddleC};
