const mode = require('./mode');

const chord = (root, scale, octave, add7) => {
	return mode(root, scale, octave).filter((note, idx) => {
		// return only the 1st (0), 3rd (2) and 5th (4) note
		// and the 7th (6) note if add7 is true
		return (idx === 0 || idx === 2 || idx === 4 || (add7 && idx === 6))
	}).join(',');
}

module.exports = chord;
