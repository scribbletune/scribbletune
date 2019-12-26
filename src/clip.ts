import { isNote, shuffle, expandStr } from './utils';
import { getChord } from './chord';

/* tslint:disable:no-var-requires */
const browserClip = typeof window !== 'undefined' && require('./browserClip');

/**
 * Get defauly params for a clip, such as root note, pattern etc
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

export const clip = (params: ClipParams) => {
  params = { ...getDefaultParams(), ...(params || {}) };

  // If notes is a string, split it into an array
  if (typeof params.notes === 'string') {
    // Remove any accidental double spaces
    params.notes = params.notes.replace(/\s{2,}/g, ' ');
    params.notes = params.notes.split(' ');
  }

  // Convert chords if any to notes
  params.notes = params.notes.map((el: any) => {
    if (isNote(el as string)) {
      // A note needs to be an array so that it can accomodate chords or single notes with a single interface
      return [el];
    }

    if (Array.isArray(el)) {
      // This could be a chord provided as an array
      // make sure it uses valid notes
      el.forEach(n => {
        if (!isNote(n)) {
          throw new TypeError('array must comprise valid notes');
        }
      });

      return el;
    }

    if (!Array.isArray(el) && getChord(el)) {
      el = getChord(el);
      return el;
    }
  });

  if (/[^x\-_\[\]R]/.test(params.pattern)) {
    throw new TypeError(
      `pattern can only comprise x - _ [ ], found ${params.pattern}`
    );
  }

  if (params.shuffle) {
    params.notes = shuffle(params.notes);
  }

  if (params.randomNotes && typeof params.randomNotes === 'string') {
    params.randomNotes = params.randomNotes.replace(/\s{2,}/g, ' ');
    params.randomNotes = params.randomNotes.split(/\s/);
  }

  if (params.randomNotes) {
    params.randomNotes = (params.randomNotes as string[]).map((el: string) => [
      el,
    ]);
  }

  // If the clip method is being called in the context of a Tone.js instrument or synth,
  // then there's no need to continue
  if (
    params.synth ||
    params.instrument ||
    params.sample ||
    params.buffer ||
    params.player ||
    params.samples ||
    params.sampler
  ) {
    return browserClip(params);
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
    length: number
  ) => {
    patternArr.forEach(char => {
      if (typeof char === 'string') {
        let note: string | string[] | null = null;
        // If the note is to be `on`, then it needs to be an array
        if (char === 'x') {
          note = params.notes[step];
          step++;
        }

        if (char === 'R' && (Math.round(Math.random()) || params.randomNotes)) {
          note = params.randomNotes
            ? params.randomNotes[
                Math.round(Math.random() * (params.randomNotes.length - 1))
              ]
            : params.notes[step];
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
        }

        // In case of an underscore, simply extend the previous note's length
        if (char === '_' && clipNotes.length) {
          clipNotes[clipNotes.length - 1].length += length;
        }

        // If the pattern is longer than the notes, then repeat notes
        if (step === params.notes.length) {
          step = 0;
        }
      }
      if (Array.isArray(char)) {
        recursivelyApplyPatternToNotes(char, length / char.length);
      }
    });
  };

  recursivelyApplyPatternToNotes(
    expandStr(params.pattern),
    hdr[params.subdiv as string] || hdr['4n']
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
    if (/[^x\-]/.test(params.accent)) {
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
