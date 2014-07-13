/**
 * Scribbletune:Generate
 * -----------------------------------
 * The generate object has the following methods:
 * 	- clip() Generates an array of notes to be converted to a midi file
 * 	- melody() WIP
 * 	- rythm() WIP
 * 	- harmony() WIP
 * 	- track() WIP
 */


module.exports = function(Scribbletune) {
	
	var Generate = function() {

		/**
		 * Set a bar's default duration to 512 ticks
		 * This is a single 4x4 bar
		 * @type {Number}
		 */
		this.bar = 512;

	};

	/**
	 * Generate a clip based on a pattern, notes and note duration
	 * @param {Array} notes Default: ['c3']
	 * @param {String} pattern Default: 'x________________'
	 * @param {Number} noteLength Default: 1/16 (Valid values: 1/16 (for a SIXTEENTH) 1/8 (for a EIGTH) 1 (for WHOLE) etc)
	 * 	
	 * @return {Array}         An array of notes
	 * 
	 * Sample output: 
	 * [{note:'c3', length:32}, {note:'', length:32}, {note:'d3', length: 64}]
	 */
	Generate.clip = function(notes, pattern, noteLength) {

		//Setup a defaults if missing
		notes = notes || ['c3'];
		pattern = pattern || 'x_______________';
		noteLength = noteLength || 1/16;
	};

	Scribbletune.generate = Generate;
	
};