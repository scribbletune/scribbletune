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
});

/**
 * HDR speed is denoted by the number of ticks per note
 * By default this is set to a quarter note (4n) to be in line with Tone.js' default subdivision
 * Technically a bar is 512 ticks long. So it's HDR speed is 512
 * @type {Object}
 */
const hdr: NVP<number> = {
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

    if (getChord(el)) {
      // A note such as c6 could be a chord (sixth) or a note (c on the 6th octave)
      // This also applies to c4, c5, c6, c9, c11
      // TODO: Identify a way to avoid returning unwanted results
      el = getChord(el);
    }

    if (Array.isArray(el)) {
      // This could be a chord provided as an array
      // make sure it uses valid notes
      el.forEach(n => {
        if (!isNote(n)) {
          throw new TypeError('array must comprise valid notes');
        }
      });
    }

    return el;
  });

  if (/[^x\-_\[\]]/.test(params.pattern)) {
    throw new TypeError(
      `pattern can only comprise x - _ [ ], found ${params.pattern}`
    );
  }

  if (params.shuffle) {
    params.notes = shuffle(params.notes);
  }

  // If the clip method is being called in the context of a Tone.js instrument or synth,
  // then there's no need to continue
  if (
    params.synth ||
    params.instrument ||
    params.sample ||
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
  const recursivelyApplyPatternToNotes = (arr: string[], length: number) => {
    arr.forEach(el => {
      if (typeof el === 'string') {
        let note: string | string[] | null = null;
        // If the note is to be `on`, then it needs to be an array
        if (el === 'x') {
          note = params.notes[step];
          step++;
        }

        // Push only note on OR off messages to the clip notes array
        if (el === 'x' || el === '-') {
          clipNotes.push({ note, length, level: 127 });
        }

        // In case of an underscore, simply extend the previous note's length
        if (el === '_' && clipNotes.length) {
          clipNotes[clipNotes.length - 1].length += length;
        }

        // If the pattern is longer than the notes, then repeat notes
        if (step === params.notes.length) {
          step = 0;
        }
      }
      if (Array.isArray(el)) {
        recursivelyApplyPatternToNotes(el, length / el.length);
      }
    });
  };

  recursivelyApplyPatternToNotes(
    expandStr(params.pattern),
    hdr[params.subdiv as string] || hdr['4n']
  );

  if (params.sizzle) {
    const volArr = [];
    const style = params.sizzle === true ? 'sin' : params.sizzle;
    const beats = clipNotes.length;
    const stepLevel = params.amp / (beats / params.sizzleReps);
    if (style === 'sin' || style === 'cos') {
      for (let i = 0; i < beats; i++) {
        const level =
          Math[style]((i * Math.PI) / (beats / params.sizzleReps)) * params.amp;
        volArr.push(Math.round(Math.abs(level)));
      }
    }

    if (style === 'rampUp') {
      let level = 0;
      for (let i = 0; i < beats; i++) {
        if (i % (beats / params.sizzleReps) === 0) {
          level = 0;
        } else {
          level = level + stepLevel;
        }
        volArr.push(Math.round(Math.abs(level)));
      }
    }

    if (style === 'rampDown') {
      let level = params.amp;
      for (let i = 0; i < beats; i++) {
        if (i % (beats / params.sizzleReps) === 0) {
          level = params.amp;
        } else {
          level = level - stepLevel;
        }
        volArr.push(Math.round(Math.abs(level)));
      }
    }

    for (let i = 0; i < volArr.length; i++) {
      clipNotes[i].level = volArr[i] ? volArr[i] : 1;
    }
  }

  return clipNotes;
};
