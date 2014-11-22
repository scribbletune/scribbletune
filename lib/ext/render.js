/**
 * Scribbletune: Render an array of notes to a midi file
 * -----------------------------------------------------
 */
'use strict';

var fs = require('fs');
var jsmidgen = require('jsmidgen');

module.exports = function(Scribbletune) {
	
	var Midi = function() {};

	Midi.writeToFile = function(notes, fileName) {

		if(notes === undefined) throw new Error('You must provide an array of notes to write!');

		fileName = fileName || 'music.mid';
		
		var file = new jsmidgen.File();
		var track = new jsmidgen.Track();
		file.addTrack(track);

		notes.map(function(noteObj, idx){

			//var volume = Math.round(Math.abs(Math.cos(idx)) * 127);
			var level = noteObj.level || 127;
			if(noteObj.note !== '') 
				track
					//addNote(track, noteObj with octave, ticks/interval/noteLength)
					//noteOn = function(channel, pitch, time, velocity)
					//.addNote(0, noteObj.note, noteObj.length);
					.noteOn(0, noteObj.note, null, level)
					.noteOff(0, noteObj.note, noteObj.length, level);
			else 
				track
					.noteOff(0, noteObj.note, noteObj.length);
		});

		fs.writeFileSync(fileName, file.toBytes(), 'binary');

	}

	Scribbletune.render = Midi.writeToFile;
	
};