import type { EventFn } from './event-fn';
import type { PlayerObserverFn } from './player-observer-fn';
import type { SynthParams } from './synth-params';

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
    playerCb?: PlayerObserverFn;
}

export type { ChannelParams };
