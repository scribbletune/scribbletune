import { Channel } from './channel';
import { convertChordsToNotes, randomInt, shuffle, expandStr } from './utils';
// import { window } from './window';

// if (!(window as any).Tone) {
//   (window as any).Tone = Tone;
// }
// const tone = (window as any).Tone;
// const tone = Tone || (window as any).Tone;

const defaultSubdiv = '4n';
const defaultDur = '8n';

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
  align: '1m',
  alignOffset: '0',
  amp: 100,
  accentLow: 70,
  randomNotes: null,
  offlineRendering: false,
});

/* UNUSED *
 * HDR speed is denoted by the number of ticks per note
 * By default this is set to a quarter note (4n) to be in line with Tone.js' default subdivision
 * Technically a bar is 512 ticks long. So it's HDR speed is 512
 * @type {Object}
 * /
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
/* */

export const getNote = (
  el: string,
  params: ClipParams,
  counter: number
): string | (string | string[])[] => {
  if (el === 'R' && params.randomNotes && params.randomNotes.length > 0) {
    return params.randomNotes[randomInt(params.randomNotes.length - 1)];
  }
  if (params.notes) {
    return params.notes[counter % (params.notes.length || 1)];
  }
  return '';
};

export const getDuration = (
  params: ClipParams,
  counter: number
): string | number | undefined => {
  return params.durations
    ? params.durations[counter % params.durations.length]
    : params.dur || params.subdiv || defaultDur;
};

export const recursivelyApplyPatternToDurations = (
  patternArr: string[],
  length: number,
  durations: number[] = []
): number[] => {
  patternArr.forEach(char => {
    if (typeof char === 'string') {
      if (char === 'x' || char === 'R') {
        durations.push(length);
      }
      if (char === '_' && durations.length) {
        durations[durations.length - 1] += length;
      }
    }
    if (Array.isArray(char)) {
      recursivelyApplyPatternToDurations(char, length / char.length, durations);
    }
  });
  return durations;
};

const generateSequence = (
  params: ClipParams,
  channel: Channel,
  context?: any
): any => {
  context = context || Tone.getContext();

  if (!params.pattern) {
    throw new Error('No pattern provided!');
  }

  if (!params.durations && !params.dur) {
    params.durations = recursivelyApplyPatternToDurations(
      expandStr(params.pattern),
      Tone.Ticks(params.subdiv || defaultSubdiv).toSeconds()
    );
  }

  return new Tone.Sequence({
    callback: channel.getSeqFn(params),
    events: expandStr(params.pattern),
    subdivision: params.subdiv || defaultSubdiv,
    context,
  });
};

export const totalPatternDuration = (
  pattern: string,
  subdivOrLength: string | number
): number => {
  return typeof subdivOrLength === 'number'
    ? subdivOrLength * expandStr(pattern).length
    : Tone.Ticks(subdivOrLength).toSeconds() * expandStr(pattern).length;
};

const leastCommonMultiple = (n1: number, n2: number): number => {
  const [smallest, largest] = n1 < n2 ? [n1, n2] : [n2, n1];
  let i = largest;
  while (i % smallest !== 0) {
    i += largest;
  }
  return i;
};

export const renderingDuration = (
  pattern: string,
  subdivOrLength: string | number,
  notes: string | (string | string[])[],
  randomNotes: undefined | null | string | (string | string[])[]
): number => {
  const patternRegularNotesCount = pattern.split('').filter(c => {
    return c === 'x';
  }).length;
  const patternRandomNotesCount = pattern.split('').filter(c => {
    return c === 'R';
  }).length;
  const patternNotesCount = randomNotes?.length
    ? patternRegularNotesCount
    : patternRegularNotesCount + patternRandomNotesCount;
  const notesCount = notes.length || 1;
  return (
    (totalPatternDuration(pattern, subdivOrLength) / patternNotesCount) *
    leastCommonMultiple(notesCount, patternNotesCount)
  );
};

let ongoingRenderingCounter = 0;
let originalContext: any;

const offlineRenderClip = (params: ClipParams, duration: number) => {
  if (!originalContext) {
    originalContext = Tone.getContext();
  }
  ongoingRenderingCounter++;
  const player = new Tone.Player({ context: originalContext, loop: true });
  Tone.Offline(async (context: any): Promise<void> => {
    const sequence = generateSequence(params, context);
    await Tone.loaded();
    sequence.start();
    context.transport.start();
  }, duration).then((buffer: any) => {
    player.buffer = buffer;
    ongoingRenderingCounter--;
    if (ongoingRenderingCounter === 0) {
      Tone.setContext(originalContext);
      params.offlineRenderingCallback?.();
    }
  });
  player.toDestination();
  player.sync();
  return player;
};

/**
 * @param  {Object}
 * @return {Tone.js Sequence Object}
 * Take a object literal that may have a Tone.js player OR instrument
 * or simply a sample or synth with a pattern and return a Tone.js sequence
 */
export const clip = (params: ClipParams, channel: Channel): any => {
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

  if (params.offlineRendering) {
    return offlineRenderClip(
      params,
      renderingDuration(
        params.pattern,
        params.subdiv || defaultSubdiv,
        params.notes,
        params.randomNotes
      )
    );
  }
  return generateSequence(params, channel, originalContext);
};
