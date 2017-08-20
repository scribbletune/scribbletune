'use strict';

const fs = require('fs');
const assert = require('assert');
const jsmidgen = require('jsmidgen');
const setMiddleC = require('./setMiddleC');

function doesArrayContainAnArray(arr){
  return arr.some(function(ele){
    return Object.prototype.toString.call( ele ) === '[object Array]'
  });
}

/**
 * Takes an array of clips and merges them on the same track. 
 * @param  {Array} clipArray	Format: [{note: ['c3'], level: 127, length: 64}, [...], ...]
 */
const mergeMidiClips = (clipArray) => {

	let clip = [];
	let maxLenght = 0;
	// Get the length of the final clip to be returned. (longest clip)
	clipArray.forEach((noteObj) => {
		if (noteObj.length > maxLenght) {
			maxLenght = noteObj.length;
		} 
	});
	// loop through all clicks and get the value of each clip.
	let finalClip = [];
	for(let i = 0; i < maxLenght; i++) {
		let notes = {
			note: null,
			length: 0,
			level: 0
		};
		// Loop through each clip and compile it into the finalClip.
		clipArray.forEach((clipObj) => {	
			// This loop is for when you have a uneven clip that doesn't reach the maxLenght. 
			// So what it does is double smaller clips until it reaches target length.
			let index = i;
			while (clipObj[index] === undefined) {
				index = Math.floor((index - clipObj.length));
				if (index < 1) {
					index = 0
				}
			}

			// Merge all notes. 
			if (clipObj[index].note != null) {
				if (notes.note == null) notes.note = [];
				notes.note = notes.note.concat(clipObj[index].note);
			}

			// Take the highest value of all the clip's lengths.
			if (notes.length !== undefined && clipObj[index].length > notes.length) {
				notes.length = clipObj[index].length;
			}

			// Take the highest value of all the clip's levels.
			if (notes.level !== undefined && clipObj[index].level > notes.level) {
				notes.level = clipObj[index].level;
			}
		});	
		finalClip.push(notes);
	} // end for loop that goes per click. 

	return finalClip;
}

/**
 * Take an array of note objects to generate a MIDI file in the same location as this method is called
 * @param  {Array} notes    Notes are in the format: {note: ['c3'], level: 127, length: 64}
 * @param  {String} fileName If a filename is not provided, then `music.mid` is used by default
 */
const midi = (notes, fileName) => {
	assert(notes !== undefined && typeof notes !== 'string', 'You must provide an array of notes to write!');
	fileName = fileName || 'music.mid';
	let file = new jsmidgen.File();
	let track = new jsmidgen.Track();
	file.addTrack(track);

	// If in the array of notes, there are other arrays of notes, then flatten them into one track.
	if (doesArrayContainAnArray(notes)) {
		notes.forEach((item, i, notesArray) => {
			if (Object.prototype.toString.call( item ) !== '[object Array]') {
				notesArray[i] = [item]; 
			}
		});
		// Merge all the clips into one track
		notes = mergeMidiClips(notes);
	}

	notes.forEach((noteObj) => {
		let level = noteObj.level || 127;
		// While writing chords (multiple notes per tick)
		// only the first noteOn (or noteOff) needs the complete arity of the function call
		// subsequent calls need only the first 2 args (channel and note)
		if (noteObj.note) {
			noteObj.note = setMiddleC.transposeNote(noteObj.note);
			//Transpose the note to the correct middle C
			if (typeof noteObj.note === 'string') {
				track.noteOn(0, noteObj.note, noteObj.length, level); // channel, pitch(note), length, velocity
				track.noteOff(0, noteObj.note, noteObj.length, level);
			} else {
				track.addChord(0, noteObj.note, noteObj.length, level);
			}
		} else {
			track.noteOff(0, '', noteObj.length);
		}
	});

	fs.writeFileSync(fileName, file.toBytes(), 'binary');
}

module.exports = midi;
