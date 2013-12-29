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

		var returnArr = [];
		var count = 0;

		for (var i = 0; i < obj.numberOfBeats * obj.numberOfBars; i++) {
			var note = obj.notesArr[count];
			if(obj.randomize) note = obj.notesArr[_.random(obj.notesArr.length - 1)];
			returnArr.push(note);
			count++;
			if(count == obj.notesArr.length) count = 0;
		}

		return returnArr;
	}
	

};

module.exports = Generate;