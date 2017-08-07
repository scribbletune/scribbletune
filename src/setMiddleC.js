'use strict';
const assert = require('assert');
let transposition = 0;
let startOctave;
//Initialzing startOctave for later
/**
 * Takes an integer and transposes all notes to a different middle C octave.
 * @param {Integer} octaveIndex		The new octave for middle C.
 */
function setMiddleC(octaveIndex) {
	assert(Number.isInteger(octaveIndex), 'Octave Index must be an integer.');
	transposition = octaveIndex - 4;
}

/**
 * Takes an octave and transposes it to the octave determined by transposition
 * @param {Integer/String} initialOctave	The initial octave
 * @return {Integer} The correctly transposed octave
 */
function transposeOctave(initialOctave) {
	assert(Number.isInteger(initialOctave) || (typeof initialOctave === 'string' && Number.isInteger(parseFloat(initialOctave))), 'Initial Octave must be an integer or an integer in a string.');
	if(typeof initialOctave === 'string') {
		initialOctave = parseInt(initialOctave);
	}
	return initialOctave += transposition;
}
/**
 * Takes a noteObj and transposes the note into the octave given by transposition 
 * @param {String/Array} noteArg		The Array/String contaning the note(s)
 * @param {Integer} octave Optional octave to transpose to  
 * @return {String(s)} 	The correctly transposed note(s)
 */
const transposeNote = (noteArg, octave) => {
    let note;
	assert(noteArg !== undefined && (typeof noteArg === 'string' || typeof noteArg === 'object') && noteArg.note === undefined && noteArg[0] !== undefined, 'NoteArg must contain a note that is either an array or a string.');
	assert(Number.isInteger(octave) || octave === undefined, 'Octave must be an integer');
	if(typeof noteArg === 'string') {
		//If a single note was passed, transpose the single note
		note = transposeSingle(noteArg, 0, octave);
	} else {
		//If an array of notes were passed, transpose every note in the array
		note = [];
		//Create an array for the transposed notes to be stores in
		for(var i = 0; i<noteArg.length; i++) {
		    const transposedNote = transposeSingle(noteArg[i], i, octave);
		    //Transpose the single note
		    note.push(transposedNote);
		    //Push the transposed note into the note array
		}
	}
	return note;
}
/**
 * Transposes a single note to the correct octave determined by transposition or octave argument
 * @param {String} note     Note to be transposed
 * @param {Integer} noteIndex   Index in note array
 * @param {Integer} octave Optional octave to transpose to  
 * @return {String} Transposed note
 */
const transposeSingle = (note, noteIndex, octave) => {
	assert(typeof note === 'string', 'Note must be a string.');
	assert(Number.isInteger(octave) || octave === undefined, 'If octave is passed, it must be an integer.');
    let index = 1;
	if (isNaN(note[1])) {
		//Test if note is a single character like 'a5' or if it is like 'ab5'
		index = 2;
	}
	let oct = parseInt(note.slice(index,note.length));
	if (noteIndex === 0) {
		startOctave = oct;
	}
	//Parse the octave into an integer
	if (octave) {
		oct = octave + (oct - startOctave);
	} else {
		oct += transposition;
	}
	//Transpose the octave
	return note.slice(0,index) + oct.toString();
}
module.exports = {setMiddleC, transposeNote, transposeOctave};