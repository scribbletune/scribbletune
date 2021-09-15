import { convertChordsToNotes, randomInt, shuffle, expandStr } from './utils';

/**
 * Get default params for a clip, such as root note, pattern etc
 * @return {Object}
 */
const getDefaultParams = (): ClipParams => ({
  notes: ['C4'],
  pattern: 'x',
  shuffle: false,
  sizzle: false,
  sizzleReps: 1,
  arpegiate: false,
  subdiv: '4n',
  amp: 100,
  accentLow: 70,
  randomNotes: null,
  offlineRendering: false,
});

/**
 * HDR speed is denoted by the number of ticks per note
 * By default this is set to a quarter note (4n) to be in line with Tone.js' default subdivision
 * Technically a bar is 512 ticks long. So it's HDR speed is 512
 * @type {Object}
 */
const hdr: NVP<number> = {
  '1m': 2048,
  '2m': 4096,
  '3m': 6144,
  '4m': 8192,
  '1n': 512,
  '2n': 256,
  '4n': 128,
  '8n': 64,
  '16n': 32,
};

export const clip = (params: ClipParams): any => {
  params = { ...getDefaultParams(), ...(params || {}) };

  // If notes is a string, split it into an array
  if (typeof params.notes === 'string') {
    // Remove any accidental double spaces
    params.notes = params.notes.replace(/\s{2,}/g, ' ');
    params.notes = params.notes.split(' ');
  }

  params.notes = params.notes ? params.notes.map(convertChordsToNotes) : [];

  if (/[^x\-_[\]R]/.test(params.pattern)) {
    throw new TypeError(
      `pattern can only comprise x - _ [ ] R, found ${params.pattern}`
    );
  }

  if (params.shuffle) {
    params.notes = shuffle(params.notes);
  }

  if (params.randomNotes && typeof params.randomNotes === 'string') {
    params.randomNotes = params.randomNotes.replace(/\s{2,}/g, ' ').split(/\s/);
  }

  if (params.randomNotes) {
    params.randomNotes = (params.randomNotes as string[]).map(
      convertChordsToNotes
    );
  }

  const clipNotes: NoteObject[] = [];
  let step = 0;
  /**
   * Recursively apply pattern to notes
   *
   * Pass in a pattern array such as ['x', '-', 'x', 'x'] with a length for each element
   * The length is the HDR speed or tick length (obtained from the hdr object in this script)
   * If the element of this array is also a (pattern) array, then divide the length by
   * the length of the inner array and then call the recursive function on that inner array
   */
  const recursivelyApplyPatternToNotes = (
    patternArr: string[],
    length: number,
    parentNoteLength: number | boolean
  ) => {
    let totalLength = 0;
    patternArr.forEach((char, idx) => {
      if (typeof char === 'string') {
        let note: any = null;

        if (char === '-') {
          // note = null;
        } else if (
          char === 'R' &&
          randomInt() && // Use 1/2 probability for R to pick from param.notes
          params.randomNotes &&
          params.randomNotes.length > 0
        ) {
          note = params.randomNotes[randomInt(params.randomNotes.length - 1)];
        } else if (params.notes) {
          note = params.notes[step];
        }

        if (char === 'x' || char === 'R') {
          step++;
        }

        // Push only note on OR off messages to the clip notes array
        if (char === 'x' || char === '-' || char === 'R') {
          clipNotes.push({
            note,
            length,
            level:
              char === 'R' && !params.randomNotes
                ? (params.accentLow as number)
                : (params.amp as number),
          });
          totalLength += length;
        }

        // In case of an underscore, simply extend the previous note's length
        if (char === '_' && clipNotes.length) {
          clipNotes[clipNotes.length - 1].length += length;
          totalLength += length;
        }

        // if there were triplets in this iteration then ajust length of the last note
        if (
          parentNoteLength &&
          totalLength !== parentNoteLength &&
          idx === patternArr.length - 1
        ) {
          const diff: number = Math.abs(
            (parentNoteLength as number) - totalLength
          );
          const lastClipNote = clipNotes[clipNotes.length - 1];
          if (lastClipNote.length > diff) {
            lastClipNote.length = lastClipNote.length - diff;
          } else {
            lastClipNote.length = lastClipNote.length + diff;
          }
        }

        // If the pattern is longer than the notes, then repeat notes
        if (step === params.notes?.length) {
          step = 0;
        }
      }
      // Note: The following condition is not in a else if simply because
      // we do need to increment the totalLength in order to support triplets
      if (Array.isArray(char)) {
        let isTriplet = false;
        // either this is a triplet or not
        if (char.length % 2 !== 0 || length % 2 !== 0) {
          isTriplet = true;
        }
        recursivelyApplyPatternToNotes(
          char,
          Math.round(length / char.length),
          isTriplet && length
        );
        // Increment total length to support subsequent operations
        // once we are out of the recursion
        totalLength += length;
      }
    });
  };

  recursivelyApplyPatternToNotes(
    expandStr(params.pattern),
    hdr[params.subdiv as string] || hdr['4n'],
    false
  );

  // Many thanks to @R1G for the following functionality
  if (params.sizzle) {
    const volArr = [];
    const style: SizzleStyle = params.sizzle === true ? 'sin' : params.sizzle;
    const beats: number = clipNotes.length;
    const amp: number = params.amp as number;
    const sizzleReps = params.sizzleReps as number;
    const stepLevel = amp / (beats / sizzleReps);
    if (style === 'sin' || style === 'cos') {
      for (let i = 0; i < beats; i++) {
        const level = Math[style]((i * Math.PI) / (beats / sizzleReps)) * amp;
        volArr.push(Math.round(Math.abs(level)));
      }
    }

    if (style === 'rampUp') {
      let level = 0;
      for (let i = 0; i < beats; i++) {
        if (i % (beats / sizzleReps) === 0) {
          level = 0;
        } else {
          level = level + stepLevel;
        }
        volArr.push(Math.round(Math.abs(level)));
      }
    }

    if (style === 'rampDown') {
      let level = amp;
      for (let i = 0; i < beats; i++) {
        if (i % (beats / sizzleReps) === 0) {
          level = amp;
        } else {
          level = level - stepLevel;
        }
        volArr.push(Math.round(Math.abs(level)));
      }
    }

    for (let i = 0; i < volArr.length; i++) {
      clipNotes[i].level = volArr[i] ? volArr[i] : 1; // Cannot allow 0 value on level
    }
  }

  if (params.accent) {
    // TODO: Eslint barks at \- as useless, need to verify that JS handles - without \ properly.
    if (/[^x-]/.test(params.accent)) {
      throw new TypeError('Accent can only have x and - characters');
    }

    let a = 0;
    for (const clipNote of clipNotes) {
      let level =
        params.accent[a] === 'x'
          ? (params.amp as number)
          : (params.accentLow as number);

      if (params.sizzle) {
        level = (clipNote.level + level) / 2;
      }

      clipNote.level = Math.round(level);

      // Step to the next character in the accent
      a = a + 1;

      // Reset `a` so that it can loop over the accent
      if (a === params.accent.length) {
        a = 0;
      }
    }
  }

  return clipNotes;
};
