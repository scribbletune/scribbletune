const fs = require('fs');
const assert = require('assert');
const jsmidgen = require('jsmidgen');

const render = (notes, fileName = 'music.mid') => {
	assert(notes !== undefined && typeof notes !== 'string', 'You must provide an array of notes to write!');

	let file = new jsmidgen.File();
	let track = new jsmidgen.Track();
	file.addTrack(track);

	notes.forEach(function(noteObj) {
		let level = noteObj.level || 127;
		// While writing chords (multiple notes per tick)
		// only the first noteOn (or noteOff) needs the complete arity of the function call
		// subsequent calls need only the first 2 args (channel and note)
		if (noteObj.note) {
			noteObj.note.forEach((n, idx) => {
				if (idx === 0) {
					track.noteOn(0, n, null, level); // channel, pitch(note), length, velocity
				} else {
					track.noteOn(0, n); // channel, pitch(note)
				}
			});
			noteObj.note.forEach((n, idx) => {
				if (idx === 0) {
					track.noteOff(0, n, noteObj.length, level)
				} else {
					track.noteOff(0, n)
				}
			});
		} else {
			track
				.noteOff(0, '', noteObj.length);
		}
	});

	fs.writeFileSync(fileName, file.toBytes(), 'binary');
}

export default render;