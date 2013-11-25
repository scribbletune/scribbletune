var Midi = require('./node_modules/jsmidgen/lib/jsmidgen');
var fs = require('fs');
var _ = require('lodash');

//init file to write to
var file = new Midi.File();
//init Midi track
var track = new Midi.Track();
//add track to file
file.addTrack(track);

var Modes = require('./lib/modes');
var mode = Modes.get('a', 3, 'dorian');

_.map(mode, function(note){
	track.addNote(0, note, 64);	//params = track, note with octave, ticks/interval/noteLength
});



//write to Midi file
fs.writeFileSync('mode.mid', file.toBytes(), 'binary');