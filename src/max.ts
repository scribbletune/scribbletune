import { Util } from 'jsmidgen';
import { scaleMaps } from './scales';
import { chordMaps } from './chords';

/**
 * Generate a scale using static scale maps
 * @param name Name of the scale e.g. C4 major
 */
export const scale = (name: string): string[] => {
  const match: RegExpMatchArray | null = name.match(
    /([A-Ga-g])(b|#)?([0-9])\s([a-zA-Z0-9\s\#]+)/
  );
  const root: string = (match as RegExpMatchArray)[1];
  const accidental: string = (match as RegExpMatchArray)[2] || '';
  const octave: string = (match as RegExpMatchArray)[3];
  const note: string = root + accidental + octave;
  const scaleName: string = (match as RegExpMatchArray)[4];
  if (!scaleMaps[scaleName]) {
    throw `No such scale ${scaleName}`;
  }

  let pitch: number = Util.midiPitchFromNote(note);
  const scaleNotes: string[] = [note];

  for (let i: number = 0; i < scaleMaps[scaleName].length; i++) {
    if (scaleMaps[scaleName][i] === 'A') {
      pitch += 3;
    } else if (scaleMaps[scaleName][i] === 'W') {
      pitch += 2;
    } else {
      // H
      pitch += 1;
    }
    let note = Util.noteFromMidiPitch(
      pitch,
      accidental ? accidental === 'b' : true
    );
    note = note[0].toUpperCase() + note.slice(1);
    scaleNotes.push(note);
  }

  return scaleNotes;
};

/**
 * Generate a chord based on static chord maps
 * @param name
 */
export const chord = (name: string): string[] => {
  const match: RegExpMatchArray | null = name.match(
    /([A-Ga-g])(b|#)?([a-zA-Z0-9\-\+\#\s\Δ\°\ø\(\)\/]+)(\_[0-9])?/
  );
  const root: string = (match as RegExpMatchArray)[1];
  const accidental: string = (match as RegExpMatchArray)[2] || '';
  const octave: string =
    ((match as RegExpMatchArray)[4] &&
      (match as RegExpMatchArray)[4].replace(/\D/, '')) ||
    '4';
  const note: string = root + accidental + octave;
  const chordName: string = (match as RegExpMatchArray)[3];
  if (!chordMaps[chordName]) {
    throw `No such chord ${chordName}`;
  }

  const chromatic: string[] = scale(note + ' chromatic').concat(
    scale(root + accidental + (+octave + 1) + ' chromatic')
  );

  const chordNotes: string[] = [];
  chordMaps[chordName].forEach((idx: number) => {
    chordNotes.push(chromatic[idx]);
  });

  return chordNotes;
};

/**
 * Take an array of note objects to populate a clip selected in Ableton Live via Max4Live
 * @param  {<Array>NoteObject} notes    Notes are in the format: {note: ['c3'], level: 127, length: 64}
 */
export const max = (
  notes: NoteObject[],
  liveClip: string = 'live_set view highlighted_clip_slot clip'
) => {
  const liveObject = new LiveAPI(liveClip);
  const totalLength = notes.reduce((a, b) => {
    return a + b.length;
  }, 0);
  liveObject.set('loop_end', totalLength / 512);
  liveObject.call('remove_notes', 0, 1, 258, 127);
  liveObject.call('set_notes');

  const noteCount = notes.reduce(
    (a: number, b: NoteObject | null) =>
      (a = a + ((b as NoteObject).note ? (b as any).note.length : 0)),
    0
  );
  liveObject.call('notes', noteCount);

  let cursor = 0;
  notes.forEach((noteObj: any) => {
    if (noteObj.note) {
      noteObj.note.forEach((n: string) => {
        liveObject.call(
          'note',
          Util.midiPitchFromNote(n),
          cursor.toFixed(2).toString(),
          (noteObj.length / 512).toFixed(2).toString(),
          noteObj.level || 100,
          0
        );
      });

      cursor = cursor + noteObj.length / 512;
    } else {
      cursor = cursor + noteObj.length / 512;
    }
  });

  liveObject.call('done');
};
