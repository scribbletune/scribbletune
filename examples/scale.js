var scribbletune = require('../lib/scribbletune');

var clip = scribbletune.generate.clip({
	notes: scribbletune.mode.get('c', 'major', 3), 
	pattern: 'xxxxxxxx'
});

scribbletune.midi.writeToFile(clip);