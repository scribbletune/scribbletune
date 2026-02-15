import { chord, chords, scale, scales } from 'harmonics';
import { arp } from './arp';
import { clip } from './clip';
import { midi } from './midi';
import {
  getChordDegrees,
  getChordsByProgression,
  progression,
} from './progression';

export * from './types';
export {
  scale,
  scale as mode,
  scales,
  scales as modes,
  chord,
  chords,
  clip,
  getChordDegrees,
  getChordsByProgression,
  progression,
  arp,
  midi,
};
