var Midi = require('./node_modules/jsmidgen/lib/jsmidgen');
var fs = require('fs');
var _ = require('lodash');

var fileName = fileName || 'music.mid';
//init file to write to
var file = new Midi.File();
//init Midi track
var track = new Midi.Track();
//add track to file
file.addTrack(track);


track.addNoteOn(0, 'c3', 0);
track.addNoteOn(0, 'e3');
track.addNoteOn(0, 'g3');
track.addNoteOff(0, 'c3', 64);

//write track to Midi file
fs.writeFileSync(fileName, file.toBytes(), 'binary');