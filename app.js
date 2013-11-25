var midi = require('./node_modules/jsmidgen/lib/jsmidgen');
var fs = require('fs');

//init file to write to
var file = new midi.File();
//init midi track
var track = new midi.Track();
//add track to file
file.addTrack(track);

//add some sixteenth notes to generate a one bar C scale
track.addNote(0, 'c4', 64);
track.addNote(0, 'd4', 64);
track.addNote(0, 'e4', 64);
track.addNote(0, 'f4', 64);
track.addNote(0, 'g4', 64);
track.addNote(0, 'a4', 64);
track.addNote(0, 'b4', 64);
track.addNote(0, 'c5', 64);

//write to midi file
fs.writeFileSync('cscale.mid', file.toBytes(), 'binary');