var _ = require('lodash');

/*
Filter Module
-------------
Take an array of notes and apply filters to add/subtract notes in a particular way
*/
var Filters = {
	//take a set of notes and use the root note to counterpoint/alternate
	counterpoint: function(notesArr, rootNote) {
		rootNote = rootNote || notesArr[0];
		var arr = [];
		_.each(notesArr, function(note, index){
			if(index % 2 != 0) arr.push(rootNote);
			else arr.push(note);
		});
		return arr;
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
		//Toggle notes as per pattern. x => on, '' => off
		var returnArr = [];
		_.each(notesArr, function(note, index){
			var noteObj = {
				noteLength: note.noteLength,
				note: note.note
			};

			//disable note in case the pattern is at a hyphen which signifies leave this step blank
			if(pattern[index] == '-') noteObj.note = '';

			returnArr.push(noteObj);
		});
		return returnArr;
	},
}

module.exports = Filters;