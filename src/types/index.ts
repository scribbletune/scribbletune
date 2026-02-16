// ---------------------------------------------------------------------------
// Scribbletune types — consolidated from individual files
// ---------------------------------------------------------------------------

// ---- Simple aliases & unions ----

type SizzleStyle = 'sin' | 'cos' | 'rampUp' | 'rampDown';

type ProgressionScale = 'major' | 'minor' | 'M' | 'm';

type SeqFn = (time: string, el: string) => void;

/**
 * Callback function triggered when channel has a new event.
 * @param event - one of ['loaded', 'error']
 * @param params - object with event data
 */
type EventFn = (event: string, params: Record<string, unknown>) => void;

/**
 * Callback function triggered when a note is played.
 * @param params - object with player data
 */
type PlayerObserverFn = (params: Record<string, unknown>) => void;

/** Recursive pattern element produced by expandStr */
type PatternElement = string | PatternElement[];

// ---- Generic helpers ----

interface NVP<T> {
  [key: string]: T;
}

// ---- Domain interfaces ----

interface NoteObject {
  note: string[] | null;
  length: number;
  level: number;
}

interface ArpParams {
  count: number;
  order?: string;
  chords: string | string[][];
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
  preset: Record<string, unknown>;
}

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
   * Whether to apply arpeggiation.
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
   * Add a "sizzle" (in a manner of speaking) applied to the levels/ volumes.
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
   */
  offlineRendering?: boolean;
  /**
   * Callback function triggered when offline rendering is finished. Ignored when `offlineRendering: false`.
   */
  offlineRenderingCallback?: () => void;
  /**
   * URL of an audio sample for standalone clip usage (without Channel).
   *  - Example: `'https://scribbletune.com/sounds/kick.wav'`
   */
  sample?: string;
}

interface ChannelParams {
  idx?: number | string;
  name?: string;
  clips?: ClipParams[];

  /**
   * Audio context (e.g. Tone.getContext())
   */
  context?: ToneAudioContext;

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
   *
   * New use going forward: SynthParams
   */
  synth?: string | SynthParams;
  /**
   * A `Tone.Instrument` instance or the name of a synthesizer, listed in `Tone.js`. Only in the browser.
   *  - Example: `'Synth'`
   *  - Example: `new Tone.Synth()`
   */
  instrument?: string | ToneInstrument;
  /**
   * The `URL` of an audio file containing an instrument sample. Supports `WAV` format.
   *  - Example:  `'https://scribbletune.com/sounds/kick.wav'`
   */
  sample?: string;
  /**
   * A `Tone` buffer or any audio buffer.
   *  - See:  https://tonejs.github.io/docs/13.8.25/Buffer
   */
  buffer?: string | ToneLoadable;
  /**
   * A dictionary of audio samples expressed as a `{ 'Note' : 'URI', ... }` object.
   *  - Example: `{ 'C3': 'https://.../piano48.wav', 'C#3': '/Path/to/piano49.wav', ... }`
   */
  samples?: Record<string, string>;
  /**
   * A `Promise` that resolves to a `Tone.Sampler`.
   *  - Example:  `{ sampler: getSampler('korgBass') }`
   *  - See:      https://github.com/scribbletune/sampler#sampler
   */
  sampler?: ToneInstrument;
  /**
   * A `Tone.Player` instance.
   *  - See:  https://tonejs.github.io/docs/13.8.25/Player
   */
  player?: ToneInstrument;

  /**
   * External sound producer object / module
   */
  external?: ExternalOutput;

  /**
   * Name of an effect listed in `Tone.js` or `Tone.Effect` instance. Single value or Array.
   *  - Example:  `'Chorus'`
   *  - Example:  `new Tone.AutoFilter()`
   *  - Example:  `[ 'Chorus', 'AutoFilter' ]`
   */
  effects?: string | ToneNode | (string | ToneNode)[];
  /**
   * The volume in decibels, in the range `-60` to `+12`.
   *  - Default:  `0`
   *  - Example:  `-18`
   */
  volume?: number;

  /**
   * Callback function triggered when a note is played.
   */
  eventCb?: EventFn;
  /**
   * Callback function triggered when a note is played.
   */
  playerCb?: PlayerObserverFn;
}

type ChannelPattern = {
  /**
   * Channel index to apply the playing pattern.
   *  - Example:  `0`
   *  - Example:  `'beat'`
   */
  channelIdx: string;
  /**
   * The song structure for one channel, saying which clip to play at each step.
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
   */
  clipDuration?: string;
}

interface TPD {
  /** Tonic */
  T: string[];
  /** Predominant (or subdominant) */
  P: string[];
  /** Dominant */
  D: string[];
}

// ---- Exports ----

export type {
  ArpParams,
  ChannelParams,
  ChannelPattern,
  ClipParams,
  EventFn,
  NoteObject,
  NVP,
  PatternElement,
  PlayParams,
  PlayerObserverFn,
  ProgressionScale,
  SeqFn,
  SizzleStyle,
  SynthParams,
  TPD,
};
