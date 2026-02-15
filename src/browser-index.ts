import { chord, chords, scale, scales } from 'harmonics';
import { arp } from './arp';
import { clip } from './browser-clip';
import { midi } from './midi';
import {
  getChordDegrees,
  getChordsByProgression,
  progression,
} from './progression';
import { Session } from './session';

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
  Session,
};
