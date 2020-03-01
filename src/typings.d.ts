interface NoteObject {
  note: string[] | string | null;
  length: number;
  level: number;
}

interface NVP<T> {
  [key: string]: T;
}

interface TPD {
  T: string[]; // Tonic
  P: string[]; // Predominant (or subdominant)
  D: string[]; // Dominant
}

type SizzleStyle = 'sin' | 'cos' | 'rampUp' | 'rampDown';
type progressionScale = 'major' | 'minor' | 'M' | 'm';

interface ClipParams {
  /**
   * A string or array of notes names.
   *  - Default:  `[ 'C4' ]`
   *  - Example:  `'C4 D4 C4 D#4 C4 D4 C4 Bb3'`
   */
  notes: string | (string | string[])[];
  /**
   * A musical rhythm, expressed using Scribbletune's pattern language,
   * which can be adapted to output MIDI files or `Tone.js` sequences.
   *  - Default:  `'x'`
   *  - Contains: `x_-R[]`
   *  - Example:  `x_x_`
   */
  pattern: string;
  /**
   * Randomize the order of the `notes` set in the clip.
   *  - Default:  `false`
   */
  shuffle?: boolean;
  /**
   * Whether to apply apegiation.
   *  - Default:  `false`
   */
  arpegiate?: boolean;
  /**
   * Sub-division — each `x` is a quarter note by default.
   *  - Default: `'4n'`
   *  - Example: `'1m '`
   *  - See:  [Tone.js wiki ~ Time](https://github.com/Tonejs/Tone.js/wiki/Time#notation)
   */
  subdiv?: string;
  /**
   * The default MIDI amplitube/ level/ volume of a note.
   * Used as the upper bound for accents and sizzles (where the lower bound is `accentLow`).
   *  - Default:  `100`
   *  - Example:  `127`
   */
  amp?: number;
  /**
   * Add a “sizzle” (in a manner of speaking) applied to the levels/ volumes.
   *  - Default: `false`
   */
  sizzle?: boolean | SizzleStyle;
  /**
   * Accentuate the specified notes in the clip, expressed using `x-` (on/off).
   *  - Example:  `'x--x'`
   */
  accent?: string;
  /**
   * The minimum level used for accents.
   *  - Default:  `70`
   */
  accentLow?: number;
  /**
   * The number of sizzle repetitions.
   *  - Default:  `1`
   */
  sizzleReps?: number;
  /**
   * A string or array of random notes.
   *  - Default:  `null`
   */
  randomNotes?: null | string | (string | string[])[];
  /**
   * The name of a synthesizer, listed in `Tone.js`.
   *  - Example: 'PolySynth'.
   *  - See:  [GitHub ~ Tone.js/Tone/instrument](https://github.com/Tonejs/Tone.js/tree/dev/Tone/instrument)
   */
  synth?: any;
  /**
   * A `Tone` instance, only in the browser.
   *  - Example: `{ instrument: getToneMonoSynth('MonoSynth:BassGuitar') }`
   *  - See:     https://github.com/scribbletune/sampler#tone-monosynths
   */
  instrument?: any;
  /**
   * The `URL` of an audio file containing an instrument sample. Supports `WAV` format.
   *  - Example:  `'https://scribbletune.com/sounds/kick.wav'`
   */
  sample?: any;
  /**
   * A `Tone` buffer or any audio buffer.
   *  - See:  https://tonejs.github.io/docs/13.8.25/Buffer
   */
  buffer?: any;
  /**
   * A dictionary of audio samples expressed as a `{ 'Note' : 'URI', ... }` object.
   *  - Example: `{ 'C3': 'https://.../piano48.wav', 'C#3': '/Path/to/piano49.wav', ... }`
   */
  samples?: any;
  /**
   * A `Promise` that resolves to a `Tone.Sampler`.
   *  - Example:  `{ sampler: getSampler('korgBass') }`
   *  - See:      https://github.com/scribbletune/sampler#sampler
   */
  sampler?: any;
  /**
   * A `Tone.Player` instance.
   *  - See:  https://tonejs.github.io/docs/13.8.25/Player
   */
  player?: any;
  /**
   * The duration of an individual sample that is used in a browser `clip`.
   *  - Example: `'32n'`, `'1m'`
   *  - See:  [Tone.js wiki ~ Time](https://github.com/Tonejs/Tone.js/wiki/Time#notation)
   */
  dur?: string;
  /**
   * Name of an effect listed in `Tone.js`.
   *  - Example:  `[ 'Chorus' ]`
   *  - See:  [GitHub ~ Tone.js/Tone/effect](https://github.com/Tonejs/Tone.js/tree/dev/Tone/effect)
   */
  effects?: string[];
  /**
   * The volume in decibels, in the range `-60` to `+12`.
   * _(Note, not applicable to sample — it gives an error.)_
   *  - Default:  `0` (?)
   *  - Example:  `-18`
   *  - See:      https://tonejs.github.io/docs/13.8.25/Volume
   */
  volume?: number;
}

interface ChannelParams extends ClipParams {
  idx?: number;
  clips?: any;
}

type SeqFn = (time: string, el: string) => void;

declare var Tone: any;
declare var LiveAPI: any;
declare var require: NodeRequire;
declare module 'jsmidgen';
