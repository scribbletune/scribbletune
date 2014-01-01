var _ = require('lodash');

/*
Filter Module
-------------
Take an array of notes and apply filters to add/subtract notes in a particular way
*/
var Filters = {
	//take a set of notes and use the root note to counterpoint/alternate
	counterpoint: function(notesArr, rootNote) {
		rootNote = rootNote || notesArr[0].note;
		_.each(notesArr, function(noteObj, index){
			if(index % 2 != 0) noteObj.note = rootNote;
		});
		return notesArr;
	},

	//randomize
	randomize: function(notesArr) {
		return _.shuffle(notesArr);
	},

	//apply a pattern
	patternize: function(notesArr, pattern) {
		//Make sure pattern is as long as notesArr
		while(pattern.length < notesArr.length) {
			pattern += pattern;
		}
		//Disable note if the current step in the pattern is '-'
		_.each(notesArr, function(note, index){

			//disable note in case the pattern is at a hyphen which signifies leave this step blank
			if(pattern[index] == '-') note.note = '';

		});
		return notesArr;
	},
}

module.exports = Filters;