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

		Parameters:
		-----------
		@notesArr: An array of notes to be used as a palette
		@numberOfBeats: Specify beat count. Default: 16.
		@numberOfBars: Specify number of bars required. Default: 1.

		Examples:
		---------
		1. ['c3'], 16, 1 => ['c3','c3','c3','c3','c3','c3','c3','c3','c3','c3','c3','c3','c3','c3','c3','c3']
		2. ['c3', 'd3'], 16, 1 => ['c3', 'd3', 'c3', 'd3', 'c3', 'd3', 'c3', 'd3', 'c3', 'd3', 'c3', 'd3', 'c3', 'd3', 'c3', 'd3' ]
	*/
	bars: function(obj) {
		obj.notesArr = obj.notesArr || ['c3'];
		obj.numberOfBeats = obj.numberOfBeats || 16;
		obj.numberOfBars = obj.numberOfBars || 1;

		var returnArr = [];
		var count = 0;

		for (var i = 0; i < obj.numberOfBeats * obj.numberOfBars; i++) {
			returnArr.push(obj.notesArr[count]);
			count++;
			if(count == obj.notesArr.length) count = 0;
		}

		return returnArr;
	}
	

};

module.exports = Generate;