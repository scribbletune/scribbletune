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
		console.log('patternize');
		//take an array of a single 16 beats bar
		//disable notes as per pattern
		var returnArr = [];
		_.each(notesArr, function(note, index){
			if(pattern[index] == 'x') returnArr.push(notesArr[index]);
			else returnArr.push('');
		});
		return returnArr;
	},
}

module.exports = Filters;