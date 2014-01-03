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

		Parameters (Object):
		-------------------
		@notesArr: An array of notes to be used as a palette
		@beats: Specify beat count. Default: 16.
		@bars: Specify number of bars required. Default: 1.
		@randomize: Use random notes from notesArr if set to true. Default: false.
		@pattern: Specify a pattern to create the bar from. Default: 'x-xxx-xx-x-'

	*/
	bars: function(obj) {

		obj.notesArr = obj.notesArr || ['c3'];
		obj.beats = obj.beats || 16;
		obj.bars = obj.bars || 1;
		obj.randomize = obj.randomize || false;
		obj.pattern = obj.pattern || 'x-xxx-xx-x-';	//set a nice default pattern

		var requiredNumberOfNoteObjects = obj.beats * obj.bars;

		//make sure pattern is longer than the required beats * bars
		while(obj.pattern.length < requiredNumberOfNoteObjects) {
			obj.pattern += obj.pattern;
		}

		//make sure notesarr is longer than the required beats * bars
		while(obj.notesArr.length < requiredNumberOfNoteObjects) {
			obj.notesArr = obj.notesArr.concat(obj.notesArr);
		}

		var returnArr = [];

		for (var i = 0; i < requiredNumberOfNoteObjects; i++) {
			var note = obj.notesArr[i];
			if(obj.randomize) note = obj.notesArr[_.random(obj.notesArr.length - 1)];

			//create a note object to add to the return array
			var noteObj = { noteLength: 32 };
			if(obj.pattern[i] == 'x') noteObj.note = note;
			else noteObj.note = '';

			//push this note object to the return array
			returnArr.push(noteObj);

		}
		
		return returnArr;
	}

};

module.exports = Generate;