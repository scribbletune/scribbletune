import { Util } from 'jsmidgen';

/**
 * Take an array of note objects to populate a clip selected in Ableton Live via Max4Live
 * @param  {<Array>NoteObject} notes    Notes are in the format: {note: ['c3'], level: 127, length: 64}
 */
export const max = (
  notes: NoteObject[],
  liveClip = 'live_set view highlighted_clip_slot clip'
): void => {
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
