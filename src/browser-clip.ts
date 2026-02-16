import type { Channel } from './channel';
import { preprocessClipParams } from './clip-utils';
import type { ClipParams, PatternElement } from './types';
import { expandStr, randomInt } from './utils';

const defaultSubdiv = '4n';
const defaultDur = '8n';

/** Get the note(s) for the current step, cycling through the notes array. */
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

/** Get the duration for the current step, cycling through the durations array. */
export const getDuration = (
  params: ClipParams,
  counter: number
): string | number => {
  return params.durations
    ? params.durations[counter % params.durations.length]
    : params.dur || params.subdiv || defaultDur;
};

/**
 * Walk a nested pattern array and compute a flat list of note durations (in seconds).
 * Underscores (`_`) extend the previous note's duration.
 */
export const recursivelyApplyPatternToDurations = (
  patternArr: PatternElement[],
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

/** Create a Tone.Sequence from clip parameters for live browser playback. */
const generateSequence = (
  params: ClipParams,
  channel: Channel,
  context?: ToneAudioContext
): ToneSequence => {
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

/** Calculate total duration (in seconds) of a pattern at the given subdivision. */
export const totalPatternDuration = (
  pattern: string,
  subdivOrLength: string | number
): number => {
  return typeof subdivOrLength === 'number'
    ? subdivOrLength * expandStr(pattern).length
    : Tone.Ticks(subdivOrLength).toSeconds() * expandStr(pattern).length;
};

/** Compute the least common multiple of two positive integers. */
const leastCommonMultiple = (n1: number, n2: number): number => {
  const [smallest, largest] = n1 < n2 ? [n1, n2] : [n2, n1];
  let i = largest;
  while (i % smallest !== 0) {
    i += largest;
  }
  return i;
};

/**
 * Calculate the minimum duration (in seconds) needed to offline-render a clip
 * so that all notes cycle through completely.
 */
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
let originalContext: ToneAudioContext | undefined;

/** Render a clip offline into a Tone.Player buffer for later playback. */
const offlineRenderClip = (params: ClipParams, duration: number) => {
  if (!originalContext) {
    originalContext = Tone.getContext();
  }
  ongoingRenderingCounter++;
  const player = new Tone.Player({ context: originalContext, loop: true });
  Tone.Offline(async (context: ToneAudioContext): Promise<void> => {
    const sequence = generateSequence(params, context as unknown as Channel);
    await Tone.loaded();
    sequence.start();
    context.transport.start();
  }, duration).then((buffer: ToneLoadable) => {
    player.buffer = buffer;
    ongoingRenderingCounter--;
    if (ongoingRenderingCounter === 0) {
      Tone.setContext(originalContext!);
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
export const clip = (
  params: ClipParams,
  channel: Channel
): ToneSequence | ToneInstrument => {
  params = preprocessClipParams(params, { align: '1m', alignOffset: '0' });

  if (params.offlineRendering) {
    return offlineRenderClip(
      params,
      renderingDuration(
        params.pattern,
        params.subdiv || defaultSubdiv,
        params.notes || [],
        params.randomNotes
      )
    );
  }
  return generateSequence(params, channel, originalContext);
};
