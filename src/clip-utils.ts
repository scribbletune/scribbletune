import type { ClipParams } from './types';
import { convertChordsToNotes, shuffle } from './utils';

const defaultParams: ClipParams = {
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
};

/** Throw if the pattern string contains characters outside `x - _ [ ] R`. */
export const validatePattern = (pattern: string): void => {
  if (/[^x\-_[\]R]/.test(pattern)) {
    throw new TypeError(
      `pattern can only comprise x - _ [ ] R, found ${pattern}`
    );
  }
};

/**
 * Merge defaults into clip params, normalize notes/randomNotes from strings
 * to arrays, validate the pattern, and optionally shuffle notes.
 */
export const preprocessClipParams = (
  params: ClipParams,
  extraDefaults?: Partial<ClipParams>
): ClipParams => {
  params = { ...defaultParams, ...extraDefaults, ...(params || {}) };

  // Notes: string → array
  if (typeof params.notes === 'string') {
    params.notes = params.notes.replace(/\s{2,}/g, ' ').split(' ');
  }
  params.notes = params.notes ? params.notes.map(convertChordsToNotes) : [];

  // Pattern validation
  validatePattern(params.pattern);

  // Shuffle
  if (params.shuffle) {
    params.notes = shuffle(params.notes);
  }

  // Random notes preprocessing
  if (params.randomNotes && typeof params.randomNotes === 'string') {
    params.randomNotes = params.randomNotes.replace(/\s{2,}/g, ' ').split(/\s/);
  }
  if (params.randomNotes) {
    params.randomNotes = (params.randomNotes as string[]).map(
      convertChordsToNotes
    );
  }

  return params;
};
