'use strict';

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
		//we do this coz if randomize is not enabled, then we can create a sequence from the notesArr
		while(obj.notesArr.length < requiredNumberOfNoteObjects) {
			obj.notesArr = obj.notesArr.concat(obj.notesArr);
		}

		var returnArr = [];
		var count = 0;	//in case randomize is false
		//use string.replace to get pattern matches for x followed by an underscore or not and hyphens
		obj.pattern.replace(/(x_*)|(-)/g, function(match, $1, $2){
		  if($1) {
		  	//$1 matched x, x_, x___ etc
		  	//use count to determine note, but use a random number in case randomize is true
		  	var note = obj.randomize ? obj.notesArr[_.random(obj.notesArr.length - 1)] : obj.notesArr[count];
		  	returnArr.push({ note: note, noteLength: $1.length * obj.noteLength });
		  }
		  //$2 matches hyphens (equivalent to note off)
		  if($2) returnArr.push({ note: '', noteLength: obj.noteLength });

		  count++
		});
		
		return returnArr;
	}

};

module.exports = Generate;