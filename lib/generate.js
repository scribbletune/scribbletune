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
		@numberOfBars: Specify number of bars required. Default: 1.
		@randomize: Use random notes from notesArr if set to true. Default: false.

		Examples:
		---------
		1. ['c3'], 16, 1 => ['c3','c3','c3','c3','c3','c3','c3','c3','c3','c3','c3','c3','c3','c3','c3','c3']
		2. ['c3', 'd3'], 16, 1 => ['c3', 'd3', 'c3', 'd3', 'c3', 'd3', 'c3', 'd3', 'c3', 'd3', 'c3', 'd3', 'c3', 'd3', 'c3', 'd3' ]
	*/
	bars: function(obj) {

		obj.notesArr = obj.notesArr || ['c3'];
		obj.numberOfBeats = obj.numberOfBeats || 16;
		obj.numberOfBars = obj.numberOfBars || 1;
		obj.randomize = obj.randomize || false;
		obj.pattern = obj.pattern || 'xxxx';

		var returnArr = [];
		/*
			Cycle over the notesArr and generate a sequence of notes for the bar.
			Cycle over the patter array to reuse it regardless of the length of the notesArr
		*/
		var count = 0;	//to cycle over notesArr
		var patternCount = 0; //to cycle over the pattern

		for (var i = 0; i < obj.numberOfBeats * obj.numberOfBars; i++) {
			var note = obj.notesArr[count];
			if(obj.randomize) note = obj.notesArr[_.random(obj.notesArr.length - 1)];
			if(obj.pattern[patternCount] == 'x') returnArr.push(note);
			else returnArr.push('');
			count++;
			patternCount++;
			if(count == obj.notesArr.length) count = 0;
			if(patternCount == obj.pattern.length) patternCount = 0;
		}

		return returnArr;
	}
	

};

module.exports = Generate;