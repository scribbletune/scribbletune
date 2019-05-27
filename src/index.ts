import { getScale, scales } from './scale';
import { getChord, chords } from './chord';
import { clip } from './clip';
import { get } from './progression';
import { arp } from './arp';
import { midi } from './midi';
import { Session } from './session';

module.exports = {
  scale: getScale,
  mode: getScale,
  scales,
  modes: scales,
  chord: getChord,
  chords,
  clip,
  progression: get,
  arp,
  midi,
  session: typeof window !== 'undefined' && Session,
};
