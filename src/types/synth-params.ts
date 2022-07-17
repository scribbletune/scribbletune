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

export type { SynthParams };