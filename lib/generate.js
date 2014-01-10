/*
	Generate.js
	------------
	Generate an array of notes to accomodate one or more bars
*/
var _ = require('lodash');
//var patterns = require('./patterns');

var Generate = {

	/*
		Cycle through an array of notes and return required bar of notes of required noteLength.

		Parameters (Object):
		-------------------
		@notesArr: An array of notes to be used as a palette
		@noteLength: Specify beat count. Default: 32 (required for a 16 beat bar).
		@bars: Specify number of bars required. Default: 1.
		@randomize: Use random notes from notesArr if set to true. Default: false.
		@pattern: Specify a pattern to create the bar from. Default: 'x-xxx-xx-x-'

		Pattern format:
		---------------
		A pattern is made of 3 types of characters: x - _
		x Note on
		- Note off
		_ underscore(s) that follows an x denotes the length of the x

	*/
	bars: function(obj) {

		obj.notesArr = obj.notesArr || ['c3'];
		obj.noteLength = obj.noteLength || 32;
		obj.bars = obj.bars || 1;
		obj.randomize = obj.randomize || false;
		obj.pattern = obj.pattern || 'x_x_x___x___x___';	//set a nice default pattern

		var requiredNumberOfNoteObjects = 512/obj.noteLength * obj.bars;

		//make sure pattern is longer than the required noteLength * bars
		while(obj.pattern.length < requiredNumberOfNoteObjects) {
			obj.pattern += obj.pattern;
		}

		//make sure notesarr is longer than the required noteLength * bars
		while(obj.notesArr.length < requiredNumberOfNoteObjects) {
			obj.notesArr = obj.notesArr.concat(obj.notesArr);
		}

		var returnArr = [];

		//create a string for noteLengths
		var noteLengthStr = obj.pattern
				.replace(/x(_+)/g, function(t, $1){ return (t.length-1) + $1 })	//replace x___ with 3___ or x__ with 2__
				.replace(/-|_|x/g, 0);																			//replace undersores, hyphens and x with 0

		//loop through the pattern and create note objects
		for (var i = 0; i < obj.pattern.length; i++) {
			var note = obj.notesArr[i];
			if(obj.randomize) note = obj.notesArr[_.random(obj.notesArr.length - 1)];

			//create a note object to add to the return array
			var noteObj = { noteLength: obj.noteLength + obj.noteLength * noteLengthStr[i] };
			if(obj.pattern[i] == 'x') {
				//note on
				noteObj.note = note;

				//push this note object to the return array
				returnArr.push(noteObj);
			}
			else if(obj.pattern[i] == '-') {
				noteObj.note = '';
				returnArr.push(noteObj);
			}

		}
		
		return returnArr;
	}

};

module.exports = Generate;