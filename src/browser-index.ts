import { scales, chords, scale, chord } from 'harmonics';
import { clip } from './browser-clip';
import {
  getChordDegrees,
  getChordsByProgression,
  progression,
} from './progression';
import { arp } from './arp';
import { midi } from './midi';
import { Session } from './session';

const mode = scale;
const modes = scales;
const scribbletune = {
  scale,
  mode,
  scales,
  modes,
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

export default scribbletune;
