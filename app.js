var Midi = require('./node_modules/jsmidgen/lib/jsmidgen');
var fs = require('fs');
var _ = require('lodash');

var Modes = require('./lib/modes');
var Filters = require('./lib/filters');
var Patterns = require('./lib/patterns');


/*
	Example:
	--------
	var mode = Modes.get('f', 3, 'phrygian');
	//modify the notes array 
	mode = Filters.counterpoint(mode);
	add another filter (randomize)
	mode = Filters.randomize(mode);

	OR simply define the array of notes you want
	var mode = ['c2', '','','', 'c2', '','','','c2', '','','', 'c2 ', '','',''];
	

	//write the notes to a MIDI file
	writeTrackToFile(mode, 'mode.mid');

*/

//generate a melody
var melody = Modes.get('f', 2, 'phrygian');
melody = Filters.randomize(melody);
melody = melody.concat(melody);
melody = Filters.patternize(melody, Patterns.triplets1);



//write track
writeTrackToFile(melody, 'melody.mid');


function writeTrackToFile(notesArr, fileName, noteLength) {
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