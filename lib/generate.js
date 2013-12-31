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

		Parameters Object:
		------------------
		@notesArr: An array of notes to be used as a palette
		@numberOfBeats: Specify beat count. Default: 16.
		@bars: Specify number of bars required. Default: 1.
		@randomize: Use random notes from notesArr if set to true. Default: false.
		@pattern: Specify a pattern to create the bar from. Default: 'xxxx'

	*/
	bars: function(obj) {

		obj.notesArr = obj.notesArr || ['c3'];
		obj.numberOfBeats = obj.numberOfBeats || 16;
		obj.bars = obj.bars || 1;
		obj.randomize = obj.randomize || false;
		obj.pattern = obj.pattern || 'x-xxx-xx-x-';	//set a nice default pattern

		var returnArr = [];
		/*
			Cycle over the notesArr and generate a sequence of notes for the bar.
			Cycle over the patter array to reuse it regardless of the length of the notesArr
		*/
		var count = 0;	//to cycle over notesArr
		var patternCount = 0; //to cycle over the pattern

		for (var i = 0; i < obj.numberOfBeats * obj.bars; i++) {
			var note = obj.notesArr[count];
			if(obj.randomize) note = obj.notesArr[_.random(obj.notesArr.length - 1)];

			//create a note object to add to the return array
			var noteObj = { noteLength: 32 };
			if(obj.pattern[patternCount] == 'x') noteObj.note = note;
			else noteObj.note = '';

			//push this note object to the return array
			returnArr.push(noteObj);

			count++;
			patternCount++;
			if(count == obj.notesArr.length) count = 0;
			if(patternCount == obj.pattern.length) patternCount = 0;
		}

		return returnArr;
	}

};

module.exports = Generate;