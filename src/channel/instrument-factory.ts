import type { ChannelParams, SynthParams } from '../types';
import { errorHasMessage } from '../utils';

/**
 * Check Tone.js object loaded state and either invoke `resolve` right away, or attach to and wait using Tone onload cb.
 * It's an ugly hack that reaches into Tone's internal ._buffers or ._buffer to insert itself into .onload() callback.
 * Tone has different ways to pull the onload callback from within to the API, so this implementation is very brittle.
 * The sole reason for its existence is to handle async loaded state of Tone instruments that we allow to pass in from outside.
 * If that option is eliminated, then this hacky function can be killed (or re-implemented via public onload API)
 * @param toneObject Tone.js object (will work with non-Tone objects that have same loaded/onload properties)
 * @param resolve onload callback
 */
export function checkToneObjLoaded(
  toneObject: ToneLoadable,
  resolve: () => void
): void {
  const skipRecursion = toneObject instanceof Tone.Sampler; // Sampler has a Map of ToneAudioBuffer, and our method to find inner .onload() does not work since there is no single one.

  if ('loaded' in toneObject) {
    if (toneObject.loaded) {
      resolve();
      return;
    }
    if (skipRecursion) {
      return;
    }
    // Try Recursion into inner objects:
    let handled = false;
    ['buffer', '_buffer', '_buffers'].forEach(key => {
      if (key in toneObject) {
        checkToneObjLoaded(toneObject[key] as ToneLoadable, resolve);
        handled = true;
      }
    });
    if (handled) {
      return;
    }
  }

  // Check object type if it has load/onload (and _buffers or _buffer), then call resolve()
  // The list was created for Tone@14.8.0 by grepping and reviewing the source code.
  // Known objecs to have:
  const hasOnload =
    toneObject instanceof Tone.ToneAudioBuffer ||
    toneObject instanceof Tone.ToneBufferSource ||
    // Falback for "future" objects
    ('loaded' in toneObject && 'onload' in toneObject);

  if (!hasOnload) {
    // This is not a good assumption. E.g. it does not work for Tone.ToneAudioBuffers
    resolve();
  } else {
    const oldOnLoad = toneObject.onload;
    toneObject.onload = () => {
      if (oldOnLoad && typeof oldOnLoad === 'function') {
        toneObject.onload = oldOnLoad;
        oldOnLoad();
      }
      resolve();
    };
  }
}

/** Clone a Tone instrument into a different audio context, waiting for it to load. */
export function recreateToneObjectInContext(
  toneObject: ToneInstrument,
  context: ToneAudioContext
): Promise<ToneInstrument> {
  context = context || Tone.getContext();

  return new Promise<ToneInstrument>((resolve, _reject) => {
    if (toneObject instanceof Tone.PolySynth) {
      const newObj = new (Tone as unknown as ToneDynamic)[
        toneObject._dummyVoice.name
      ]({
        ...toneObject.get(),
        context,
      });
      checkToneObjLoaded(newObj as ToneLoadable, () => resolve(newObj));
    } else if (toneObject instanceof Tone.Player) {
      const newObj = new Tone.Player({
        url: toneObject._buffer,
        context,
        onload: () =>
          checkToneObjLoaded(newObj as ToneLoadable, () => resolve(newObj)),
      } as Record<string, unknown>);
    } else if (toneObject instanceof Tone.Sampler) {
      const { attack, curve, release, volume } = toneObject.get();
      const paramsFromSampler = {
        attack,
        curve,
        release,
        volume,
      };
      const paramsFromBuffers = {
        baseUrl: toneObject._buffers.baseUrl,
        urls: Object.fromEntries(toneObject._buffers._buffers.entries()),
      };
      const newObj = new Tone.Sampler({
        ...paramsFromSampler,
        ...paramsFromBuffers,
        context,
        onload: () =>
          checkToneObjLoaded(newObj as unknown as ToneLoadable, () =>
            resolve(newObj)
          ),
      } as Record<string, unknown>);
    } else {
      const newObj = new (Tone as unknown as ToneDynamic)[toneObject.name]({
        ...toneObject.get(),
        context,
        onload: () =>
          checkToneObjLoaded(newObj as ToneLoadable, () => resolve(newObj)),
      });
      checkToneObjLoaded(newObj as ToneLoadable, () => resolve(newObj));
    }
  });
}

export interface InstrumentResult {
  instrument: ToneInstrument;
  external?: ExternalOutput;
}

/**
 * Create an instrument from channel params. The instrument is available
 * synchronously on the returned object; `initPromise` resolves once the
 * instrument is fully loaded, recreated in the correct context, and
 * volume-adjusted.
 */
export function createInstrument(
  context: ToneAudioContext,
  params: ChannelParams,
  channelMeta: { idx: number | string; name: string }
): {
  instrument: ToneInstrument;
  external?: ExternalOutput;
  initPromise: Promise<ToneInstrument>;
} {
  let instrument!: ToneInstrument;
  let external: ExternalOutput | undefined;

  context = context || Tone.getContext();

  const loadPromise = new Promise<void>((resolve, reject) => {
    /*
     *  1. The params object can be used to pass a sample (sound source) OR a synth(Synth/FMSynth/AMSynth etc) or samples.
     *  Scribbletune will then create a Tone.js Player or Tone.js Instrument or Tone.js Sampler respectively
     *  2. It can also be used to pass a Tone.js Player object or instrument that was created elsewhere
     *  (mostly by Scribbletune itself in the channel creation method)
     **/

    if (params.synth) {
      if (params.instrument) {
        throw new Error(
          'Either synth or instrument can be provided, but not both.'
        );
      }
      if ((params.synth as SynthParams).synth) {
        const synthName = (params.synth as SynthParams).synth;
        const preset = (params.synth as SynthParams).preset || {};
        instrument = new (Tone as unknown as ToneDynamic)[synthName]({
          ...preset,
          context,
          // Use onload for cases when synthName calls out Tone.Sample/Player/Sampler.
          // It could be a universal way to load Tone.js instruments.
          onload: () => checkToneObjLoaded(instrument, resolve),
          // This onload is ignored in all synths. Therefore we call checkToneObjLoaded() again below.
          // It is safe to call resolve() multiple times for Promise<void>
        });
        checkToneObjLoaded(instrument, resolve);
      } else {
        instrument = params.synth as unknown as ToneInstrument; // TODO: This is dangerous by-reference assignment.
        console.warn(
          'The "synth" parameter with instrument will be deprecated in the future. Please use the "instrument" parameter instead.'
        );
        // params.synth describing the Tone[params.synth.synth] is allowed.
        checkToneObjLoaded(instrument, resolve);
      }
    } else if (typeof params.instrument === 'string') {
      instrument = new (Tone as unknown as ToneDynamic)[
        params.instrument as string
      ]({ context });
      checkToneObjLoaded(instrument, resolve);
    } else if (params.instrument) {
      instrument = params.instrument; // TODO: This is dangerous by-reference assignment.
      checkToneObjLoaded(instrument, resolve);
    } else if (params.sample || params.buffer) {
      instrument = new Tone.Player({
        url: params.sample || params.buffer,
        context,
        onload: () => checkToneObjLoaded(instrument, resolve),
      });
    } else if (params.samples) {
      instrument = new Tone.Sampler({
        urls: params.samples,
        context,
        onload: () => checkToneObjLoaded(instrument, resolve),
      });
    } else if (params.sampler) {
      instrument = params.sampler; // TODO: This is dangerous by-reference assignment.
      checkToneObjLoaded(instrument, resolve);
    } else if (params.player) {
      instrument = params.player; // TODO: This is dangerous by-reference assignment.
      checkToneObjLoaded(instrument, resolve);
    } else if (params.external) {
      external = { ...params.external }; // Sanitize object by shallow clone
      instrument = {
        context,
        volume: { value: 0 },
      } as unknown as ToneInstrument;
      // Do not call! checkToneObjLoaded(instrument, resolve);

      if (params.external.init) {
        return params.external
          .init(context.rawContext)
          .then(() => {
            resolve();
          })
          .catch((e: unknown) => {
            reject(
              new Error(
                `${errorHasMessage(e) ? e.message : e} loading external output module of channel idx ${
                  channelMeta.idx
                }, ${channelMeta.name ?? '(no name)'}`
              )
            );
          });
      } else {
        resolve();
      }
    } else {
      throw new Error(
        'One of required synth|instrument|sample|sampler|samples|buffer|player|external is not provided!'
      );
    }

    if (!instrument) {
      throw new Error('Failed instantiating instrument from given params.');
    }
  });

  const initPromise = loadPromise
    .then(() => {
      // Recreate instrument in the target context if needed
      if (!external && instrument?.context !== context) {
        return recreateToneObjectInContext(instrument, context).then(newObj => {
          instrument = newObj;
        });
      }
    })
    .then(() => {
      // Adjust volume
      if (params.volume) {
        instrument.volume.value = params.volume;
        external?.setVolume?.(params.volume);
      }
      return instrument;
    });

  return { instrument, external, initPromise };
}
