var scribbletune = require('../lib/scribbletune');

var clip = 
	scribbletune.generate.clip({
		notes: scribbletune.mode.get('c', 'diminished whole half', 3), 
		pattern: 'xxxxxxxxxxxxxxxx'
	});

scribbletune.midi.writeToFile(clip);