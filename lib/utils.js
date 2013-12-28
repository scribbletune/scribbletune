var Midi = require('../node_modules/jsmidgen/lib/jsmidgen');
var fs = require('fs');
var _ = require('lodash');

var Utils = {
	writeTrackToFile: function (notesArr, fileName, noteLength) {
		var noteLength = noteLength || 32;

		//init file to write to
		var file = new Midi.File();
		//init Midi track
		var track = new Midi.Track();
		//add track to file
		file.addTrack(track);

		_.map(notesArr, function(note){
			if(note !== '') track.addNote(0, note, noteLength);	//params = track, note with octave, ticks/interval/noteLength
			else track.noteOff(1, note, noteLength);
		});

		//write track to Midi file
		fs.writeFileSync(fileName, file.toBytes(), 'binary');
	}

};

module.exports = Utils;