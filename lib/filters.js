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

}

module.exports = Filters;