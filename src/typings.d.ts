interface NoteObject {
  note: string[];
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
   * A string or array of notes or chords names.
   *  - Default:  `[ 'C4' ]`
   *  - Example:  `'C4 D4 C4 D#4 C4 D4 C4 Bb3'`
   */
  notes?: string | (string | string[])[];
  /**
   * A musical rhythm, expressed using Scribbletune's pattern language,
   * which can be adapted to output MIDI files or `Tone.js` sequences.
   *  - Default:  `'x'`
   *  - Contains: `x_-R[]`
   *  - Example:  `'x_x_'`
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
   *  - Example: `'1m'`
   *  - See:  [Tone.js wiki ~ Time](https://github.com/Tonejs/Tone.js/wiki/Time#notation)
   */
  subdiv?: string;
  /**
   * Align start of clip playing to specific time grid.
   *  - Default: `'1m'`
   *  - Example: `'4m'` will align the clip to every 4 measures
   */
  align?: string;
  /**
   * Offset start of clip playing from the time grid defined by `align` parameter.
   *  - Default: `'0'`
   *  - Example: `'0.75m'` will offset the clip to start at 3rd beat of 4:4 measure
   * well, `'0.75m'` won't really work... Tone.js@14.8.0 does not support fractional measures (for no good reason). Will be sending a PR to Tone.js.
   */
  alignOffset?: string;
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
   * A string or array of random notes or chords.
   *  - Default:  `null`
   *  - Example:  `'C4 D4 C4 D#4 C4 D4 C4 Bb3'`
   */
  randomNotes?: null | string | (string | string[])[];

  /**
   * The duration of an individual sample that is used in a browser `clip`.
   *  - Example: `'32n'`, `'1m'`, `2.3`
   *  - See:  [Tone.js wiki ~ Time](https://github.com/Tonejs/Tone.js/wiki/Time#notation)
   */
  dur?: string;
  /**
   * Durations of notes in a browser `clip` as a number of quarter notes.
   * Internal usage only, please use the pattern notation (`x`,`-`,`_`) instead.
   *  - Example: `[1, 1, 0.5, 0.25]`
   */
  durations?: number[];

  /**
   * Boolean parameter to trigger offline rendering.
   * If true, `scribbletune.clip` returns a `Tone.Player` with a buffer containing a pre-rendered sound of the sequence
   * If false, it returns a `Tone.Sequence` which does live rendering.
   * Note: The rendering needs some time to complete & be saved in the buffer, before being able to playing.
   */
  offlineRendering?: boolean;
  /**
   * Callback function triggered when offline rendering is finished. Ignored when `offlineRendering: false`.
   */
  offlineRenderingCallback?: any;
}

/**
 * Definition of a synthesizer from `Tone.js`.
 */
interface SynthParams {
  /**
   *  The name of the synthesizer, listed in `Tone.js`.
   *  - Example: `'PolySynth'`.
   *  - See:  [GitHub ~ Tone.js/Tone/instrument](https://github.com/Tonejs/Tone.js/tree/dev/Tone/instrument)
   */
  synth: string;
  /**
   *  Descriptive name of the preset.
   */
  presetName?: string;
  /**
   *  Object with parameters for passing to `new Tone[synth](preset)`.
   */
  preset: any;
}

interface ChannelParams {
  idx?: number | string;
  name?: string;
  clips?: any;

  /**
   * Audio context (e.g. Tone.getContext())
   */
  context?: any;

  /**
   * The default MIDI amplitube/ level/ volume of a note.
   * Used as the upper bound for accents and sizzles (where the lower bound is `accentLow`).
   *  - Default:  `100`
   *  - Example:  `127`
   */
  amp?: number;

  /**
   * This use is depreceated: The name of a synthesizer, listed in `Tone.js`.
   *  - Example: `'PolySynth'`.
   *  - See:  [GitHub ~ Tone.js/Tone/instrument](https://github.com/Tonejs/Tone.js/tree/dev/Tone/instrument)
   *
   * New use going forward: SynthParams
   */
  synth?: string | SynthParams;
  /**
   * A `Tone.Instrument` instance or the name of a synthesizer, listed in `Tone.js`. Only in the browser.
   *  - Example: `'Synth'`
   *  - Example: `new Tone.Synth()`
   *  - Example: `getToneMonoSynth('MonoSynth:BassGuitar')`
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
   * External sound producer object / module
   */
  external?: any;

  /**
   * Name of an effect listed in `Tone.js` or `Tone.Effect` instance. Single value or Array.
   *  - Example:  `'Chorus'`
   *  - Example:  `new Tone.AutoFilter()`
   *  - Example:  `[ 'Chorus' ]`
   *  - Example:  `[ 'Chorus', 'AutoFilter' ]`
   *  - Example:  `[ 'Chorus', new Tone.AutoFilter() ]`
   *  - See:  [GitHub ~ Tone.js/Tone/effect](https://github.com/Tonejs/Tone.js/tree/dev/Tone/effect)
   */
  effects?: any | any[];
  /**
   * The volume in decibels, in the range `-60` to `+12`.
   * _(Note, not applicable to sample — it gives an error.)_
   *  - Default:  `0` (?)
   *  - Example:  `-18`
   *  - See:      https://tonejs.github.io/docs/13.8.25/Volume
   */
  volume?: number;

  /**
   * Callback function triggered when a note is played.
   */
  eventCb?: EventFn;
  /**
   * Callback function triggered when a note is played.
   */
  playerCb?: playerObserverFnc;
}

type ChannelPattern = {
  /**
   * Channel index to apply the playing pattern.
   * If no index (`idx`) is given at the creation of the Channel, it's a number, starting with 0.
   * If index is given manually, several channels can have the same index, to be played simultaneously.
   *  - Example:  `0`
   *  - Example:  `1`
   *  - Example:  `'beat'`
   *  - Example:  `'synth'`
   */
  channelIdx: string;
  /**
   * The song structure for one channel, saying which clip to play at each step,
   * Only the 10 first clips of each channel are available through this pattern.
   * Those numbered by a single char between 0 and 9.
   * `'-'` means 'silence for 1 step'.
   * `'_'` means 'extend the last clip by 1 step'.
   * If index is given manually, several channels can have the same index, to be played simultaneously.
   *  - Contains: `0123456789_-`
   *  - Example:  `'0___1___----'`
   */
  pattern: string;
};

interface PlayParams {
  /**
   * An array of ChannelPattern
   */
  channelPatterns: ChannelPattern[];
  /**
   * The time duration to play each clip in the patterns. Default is 4 bars.
   *  - Default: `'4:0:0'`
   *  - Example: `'1:0:0'`
   *  - See: https://github.com/Tonejs/Tone.js/wiki/Time#transport-time
   */
  clipDuration?: string;
}

type SeqFn = (time: string, el: string) => void;

/**
 * Callback function triggered when channel has a new event.
 * @param event - one of ['loaded', 'error']
 * @param params - object with event data
 */
type EventFn = (event: string, params: any) => void;

/**
 * Callback function triggered when a note is played.
 * @param params - object with player data
 */
type playerObserverFnc = (params: any) => void;

declare let Tone: any;
declare let LiveAPI: any;
declare let require: NodeRequire;
declare module 'jsmidgen';
declare module 'harmonics';
