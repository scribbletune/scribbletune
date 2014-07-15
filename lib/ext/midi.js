/**
 * Scribbletune:Midi
 * -----------------
 */
'use strict';

var fs = require('fs');
var jsmidgen = require('jsmidgen');

module.exports = function(Scribbletune) {
	
	var Midi = function() {};

	Midi.writeToFile = function(notes, fileName) {
		fileName = fileName || 'music.mid';
		
		var file = new jsmidgen.File();
		var track = new jsmidgen.Track();
		file.addTrack(track);

		notes.map(function(noteObj){
			if(noteObj.note !== '') track.addNote(0, noteObj.note, noteObj.length);	//params = track, noteObj with octave, ticks/interval/noteLength
			else track.noteOff(1, noteObj.note, noteObj.length);
		});

		fs.writeFileSync(fileName, file.toBytes(), 'binary');

	}

	Scribbletune.midi = Midi;
	
};