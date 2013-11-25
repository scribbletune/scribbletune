var _ = require('lodash');

module.exports = {
	//take a set of notes and use the root note to counterpoint/alternate
	counterpoint: function(notesArr, rootNote) {
		rootNote = rootNote || notesArr[0];
		var arr = [];
		_.each(notesArr, function(note, index){
			if(index % 2 == 0) arr.push(rootNote);
			else arr.push(note);
		});
		return arr;
	},

	//randomize
	randomize: function(notesArr) {
		return _.shuffle(notesArr);
	}
}