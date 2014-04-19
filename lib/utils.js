var Midi = require('../node_modules/jsmidgen/lib/jsmidgen');
var fs = require('fs');
var _ = require('lodash');
var chalk = require('chalk');


var Utils = {

	/*
		Take an array of note objects and write it to a MIDI file
		@notesArr: An array of note objects.
		@fileName: Name of the file to write to. Default: music.mid
	*/

	writeTrackToFile: function (notesArr, fileName) {
		fileName = fileName || 'music.mid';
		//init file to write to
		var file = new Midi.File();
		//init Midi track
		var track = new Midi.Track();
		//add track to file
		file.addTrack(track);

		_.map(notesArr, function(noteObj){
			//noteObj.noteLength = noteObj.noteLength || 32;		//in case there s no note length specified
			if(noteObj.note !== '') track.addNote(0, noteObj.note, noteObj.noteLength);	//params = track, noteObj with octave, ticks/interval/noteLength
			else track.noteOff(1, noteObj.note, noteObj.noteLength);
		});

		//write track to Midi file
		fs.writeFileSync(fileName, file.toBytes(), 'binary');
	},

	/*
		Visualize the generated melody
	*/
	visualize: function(notesArr) {
		var count = 0;
		console.log('--------------');
		_.map(notesArr, function(el){
			console.log('| ' +count+ '\t|' + chalk.green(el.note) + '\t' + '| ' + el.noteLength + ' |');
			count++;
		});
		console.log('--------------');
		console.log(chalk.cyan('total notes', notesArr.length));
		console.log('--------------');
	}

};

module.exports = Utils;