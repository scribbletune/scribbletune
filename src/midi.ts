// global LiveAPI:true

import fs from 'fs';
import * as jsmidgen from 'jsmidgen';

/**
 * Take an array of note objects to generate a MIDI file in the same location as this method is called
 * @param  {<Array>NoteObject} notes    Notes are in the format: {note: ['c3'], level: 127, length: 64}
 * @param  {String | null} fileName If a filename is not provided, then `music.mid` is used by default
 * If `null` is passed for `fileName`, bytes are returned instead of creating a file
 * If this method is called from a browser then it will return a HTML link that you can append in your page
 * This link will enable the generated MIDI as a downloadable file.
 * @param {Number | null} bpm If a value is provided, the generated midi file will be set to this bpm value.
 */
export const midi = (
  notes: NoteObject[],
  fileName: string | null = 'music.mid',
  bpm?: number
): string | HTMLAnchorElement | undefined => {
  const file = createFileFromNotes(notes, bpm);
  const bytes = file.toBytes();

  if (fileName === null) {
    return bytes;
  }

  if (!fileName.endsWith('.mid')) {
    fileName = fileName + '.mid';
  }

  if (
    typeof window !== 'undefined' &&
    window.URL &&
    window.URL.createObjectURL
  ) {
    return createDownloadLink(bytes, fileName);
  }

  fs.writeFileSync(fileName, bytes, 'binary');
  console.log(`MIDI file generated: ${fileName}.`);
};

/**
 * Create a downloadable link
 * @param b
 */
const createDownloadLink = (b: string, fileName: string): HTMLAnchorElement => {
  // Convert bytes to array buffer
  // Accepted answer on https://stackoverflow.com/questions/35038884/download-file-from-bytes-in-javascript
  const bytes = new Uint8Array(b.length);
  for (let i = 0; i < b.length; i++) {
    const ascii = b.charCodeAt(i);
    bytes[i] = ascii;
  }

  // Create a Blob so that we can set it up with the type of file we want (for eg MIDI)
  const blob = new Blob([bytes], { type: 'audio/midi' });

  // Create a link element to be used (you can use an existing link on the page as well)
  const link = document.createElement('a');
  link.href =
    (typeof window !== 'undefined' &&
      typeof window.URL !== 'undefined' &&
      typeof window.URL.createObjectURL !== 'undefined' &&
      window.URL.createObjectURL(blob)) ||
    '';

  // Give the downloadable file a name
  link.download = fileName;
  link.innerText = 'Download MIDI file';

  return link;
};

const createFileFromNotes = (notes: NoteObject[], bpm?: number) => {
  const file = new jsmidgen.File();
  const track = new jsmidgen.Track();

  // set the track's bpm if it is provided
  if (typeof bpm === 'number') {
    track.setTempo(bpm);
  }

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
};
