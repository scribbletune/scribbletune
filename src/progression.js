'use strict';
const Tonal = require('tonal');

const idxByDegree = {
	'i': 0,
	'ii': 1,
	'iii': 2,
	'iv': 3,
	'v': 4,
	'vi': 5,
	'vii': 6
};

/**
 * Get a chord name from degree
 * @param  {String} roman e.g. ii OR ii° OR V7
 * @return {String} e.g. m OR m7b5 OR Maj7
 */
const getChordName = roman => {
  // remove any non character
  const str = roman.replace(/\W/g, '');
  let prefix = 'M';
  // check if it s lowercase
  if (str.toLowerCase() === str) {
    prefix = 'm';
  }
  if (roman.includes('°')) {
    return prefix + '7b5';
  }
  if (roman.includes('+')) {
    return prefix + '#5';
  }

  if (roman.includes('7')) {
    return prefix === 'M' ? 'Maj7' : 'm7';
  }

  return prefix;
};

/**
 * Take the specified scale and degrees and return the chord names for them
 * These can be used as the value for the `notes` param of the `clip` method
 * @param {String} noteOctaveScale e.g. 'C4 major'
 * @param  {String} chordDegress e.g. 'I IV V IV'
 * @return {String} e.g. 'CM FM GM FM'
 */
const progression = (noteOctaveScale, chordDegress) => {
	// Set the octave if missing
  // For example if the method was called with `C major` instead of `C4 major`, then add the 4
	const noteOctaveScaleArr = noteOctaveScale.split(' ');
	if (!noteOctaveScaleArr[0].match(/\d/)) {
		noteOctaveScaleArr[0] += '4';
		noteOctaveScale = noteOctaveScaleArr.join(' ');
	}

	// Get the scale from the given note and scale/mode combination
	const mode = Tonal.Scale.notes(noteOctaveScale);
	const chordDegreesArr = chordDegress.replace(/\s*,+\s*/g, ' ').split(' ');
  // Now we have something like ['i', 'ii', 'IV']
  // Convert it to a chord family such as ['Cm', 'Dm', 'FM']
	const chordFamily = chordDegreesArr.map((roman, idx) => {
    const chordName = getChordName(roman); // e.g. m
    // get the index to be used by removing any digit or non alphabet character
    const scaleId = idxByDegree[roman.replace(/\W|\d/g, '').toLowerCase()]; // e.g. 0
		// get the note itself
		const note = mode[scaleId]; // e.g. C
		// get the octave of the note;
		const oct = note.replace(/\D+/, '');  // e.g. 4
		// now get the chord
		return note.replace(/\d/, '') + chordName + '-' + oct;
	});

	return chordFamily.toString().replace(/,/g, ' ');
};

module.exports = progression;