'use strict';

const fs = require('fs');
const assert = require('assert');
const jsmidgen = require('jsmidgen');
const setMiddleC = require('./setMiddleC');
const utils = require('./utils');

/**
 * Takes an array of clips and merges them into one track
 * @param  {Array} clipArray	Format: [{note: ['c3'], level: 127, length: 64}, [...], ...]
 */
const mergeMidiClips = (clipArray) => {
	let clip = [];
	// Get the length of the final clip to be returned (longest clip)
	const maxLength = Math.max.apply(null, clipArray.map(obj => obj.length));
	// loop through each beat
	let finalClip = [];
	for(let i = 0; i < maxLength; i++) {
		let notes = {
			note: null,
			length: 0,
			level: 0
		};
		// Loop through each clip and compile all notes into one chord
		clipArray.forEach((clipObj) => {	
			// This loop is for when you have a uneven clip that doesn't reach the maxLength
			// So what it does is double smaller clips until it reaches target length
			if (clipObj.length < maxLength) {
				clipObj = utils.doubleArrayTillMatchLength(clipObj, maxLength);
			}

			// Merge all notes
			if (clipObj[i].note !== null) {
				if (notes.note === null) notes.note = [];
				notes.note = notes.note.concat(clipObj[i].note);
			}

			// Take the highest value of all the clip's lengths
			if (notes.length !== undefined && clipObj[i].length > notes.length) {
				notes.length = clipObj[i].length;
			}

			// Take the highest value of all the clip's levels
			if (notes.level !== undefined && clipObj[i].level > notes.level) {
				notes.level = clipObj[i].level;
			}
		});	
		finalClip.push(notes);
	} // end for loop that goes per beat
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
	if (utils.doesArrayContainAnArray(notes)) {
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
