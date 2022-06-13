import type { SizzleStyle } from './sizzle-style';

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

export type { ClipParams };
