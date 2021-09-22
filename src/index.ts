import { scales, chords, scale, chord } from 'harmonics';
import { clip } from './clip';
import {
  getChordDegrees,
  getChordsByProgression,
  progression,
} from './progression';
import { arp } from './arp';
import { midi } from './midi';

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
};

export default scribbletune;
