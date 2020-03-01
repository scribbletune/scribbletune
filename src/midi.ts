/*global LiveAPI:true*/

import fs from 'fs';
import * as jsmidgen from 'jsmidgen';

/**
 * Take an array of note objects to generate a MIDI file in the same location as this method is called
 * @param  {<Array>NoteObject} notes    Notes are in the format: {note: ['c3'], level: 127, length: 64}
 * @param  {String | null} fileName If a filename is not provided, then `music.mid` is used by default
 * If `null` is passed for `fileName`, bytes are returned instead of creating a file
 */
export const midi = (
  notes: NoteObject[],
  fileName: string | null = 'music.mid'
): string | undefined => {
  const file = createFileFromNotes(notes);
  const bytes = file.toBytes();

  if (fileName === null) {
    return bytes;
  }

  if (!fileName.endsWith('.mid')) {
    fileName = fileName + '.mid';
  }

  fs.writeFileSync(fileName, bytes, 'binary');
  console.log(`MIDI file generated: ${fileName}.`);
};

function createFileFromNotes(notes: NoteObject[]) {
  const file = new jsmidgen.File();
  const track = new jsmidgen.Track();
  file.addTrack(track);

  for (const noteObj of notes) {
    const level = noteObj.level || 127;
    // While writing chords (multiple notes per tick)
    // only the first noteOn (or noteOff) needs the complete arity of the function call
    // subsequent calls need only the first 2 args (channel and note)
    if (noteObj.note) {
      if (typeof noteObj.note === 'string') {
        track.noteOn(0, noteObj.note, noteObj.length, level); // channel, pitch(note), length, velocity
        track.noteOff(0, noteObj.note, noteObj.length, level);
      } else {
        track.addChord(0, noteObj.note, noteObj.length, level);
      }
    } else {
      track.noteOff(0, '', noteObj.length);
    }
  }

  return file;
}
