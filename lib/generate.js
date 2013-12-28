/*
	Generate.js
	------------
	Generate an array of notes to accomodate one or more bars
*/
var _ = require('lodash');
//var patterns = require('./patterns');
var Generate = {

	/*
		Cycle through an array of notes and return required bar of notes of required beats.

		Parameters:
		-----------
		@notesArr: An array of notes to be used as a palette
		@numberOfBeats: Specify beat count. Default: 16.
		@numberOfBars: Specify number of bars required. Default: 1.

		Examples:
		---------
	*/
	bars: function(notesArr, numberOfBeats, numberOfBars) {
		notesArr = notesArr || ['c3'];
		numberOfBeats = numberOfBeats || 16;
		numberOfBars = numberOfBars || 1;

		var returnArr = [];

		for (var i = 0; i < numberOfBeats; i++) {
			
		}

		return notesArr;
	}
	

};

module.exports = Generate;