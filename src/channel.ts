import { clip } from './browser-clip';
import { initEffects } from './channel/effects-chain';
import { createInstrument } from './channel/instrument-factory';
import { buildSequenceCallback } from './channel/sequence-builder';
import type {
  ChannelParams,
  ClipParams,
  EventFn,
  PlayerObserverFn,
  SeqFn,
} from './types';
import { errorHasMessage } from './utils';

/**
 * Get the next logical position to play in the session
 * Tone has a build-in method `Tone.Transport.nextSubdivision('4n')`
 * but I think it s better to round off as follows for live performance
 */
const getNextPos = (
  clip: null | { align?: string; alignOffset?: string }
): number | ToneTicksValue => {
  const transportPosTicks = Tone.Transport.ticks;
  // If we are still in the first beat (bar 0, beat 0), start immediately
  if (transportPosTicks < Tone.Ticks('4n').toTicks()) {
    return 0;
  }

  // Else set it to the next aligned position
  const align = clip?.align || '1m';
  const alignOffset = clip?.alignOffset || '0';
  const alignTicks: number = Tone.Ticks(align).toTicks();
  const alignOffsetTicks: number = Tone.Ticks(alignOffset).toTicks();
  const nextPosTicks = Tone.Ticks(
    Math.floor(transportPosTicks / alignTicks + 1) * alignTicks +
    alignOffsetTicks
  );
  return nextPosTicks;
};

/**
 * Channel
 * A channel is made up of a Tone.js Player/Instrument, one or more
 * Tone.js sequences (known as clips in Scribbletune)
 * & optionally a set of effects (with or without presets)
 *
 * API:
 * clips -> Get all clips for this channel
 * addClip -> Add a new clip to the channel
 * startClip -> Start a clip at the provided index
 * stopClip -> Stop a clip at the provided index
 * activeClipIdx -> Get the clip that is currently playing
 */
export class Channel {
  idx: number | string;
  name: string;
  activePatternIdx: number;
  channelClips: (ToneSequence | null)[];
  clipNoteCount: number;
  counterResetTask: number | undefined;
  instrument!: ToneInstrument;
  external: ExternalOutput | undefined;
  initializerTask: Promise<void>;
  hasLoaded: boolean;
  hasFailed: boolean | Error;
  private eventCbFn: EventFn | undefined;
  private playerCbFn: PlayerObserverFn | undefined;
  constructor(params: ChannelParams) {
    this.idx = params.idx || 0;
    this.name = params.name || `ch ${params.idx}`;
    this.activePatternIdx = -1;
    this.channelClips = [];
    this.clipNoteCount = 0;

    // Filter out unrequired params and create clip params object

    const { clips, samples, sample, synth, ...params1 } = params;

    const { external, sampler, buffer, ...params2 } = params1;

    const { player, instrument, volume, ...params3 } = params2;

    const { eventCb, playerCb, effects, ...params4 } = params3;
    const { context = Tone.getContext(), ...originalParamsFiltered } = params4;

    this.eventCbFn = eventCb;
    this.playerCbFn = playerCb;

    // Async section
    this.hasLoaded = false;
    this.hasFailed = false;
    const result = createInstrument(context, params, {
      idx: this.idx,
      name: this.name,
    });
    this.instrument = result.instrument;
    this.external = result.external;
    this.initializerTask = result.initPromise.then(finalInstrument => {
      this.instrument = finalInstrument;
      return initEffects(this.instrument, context, params);
    });
    // End Async section

    // Sync section
    let clipsFailed: { message: string } | false = false;
    try {
      (params.clips ?? []).forEach((c: ClipParams, i: number) => {
        try {
          this.addClip({
            ...c,
            ...originalParamsFiltered,
          });
        } catch (e) {
          // Annotate the error with Clip info
          throw new Error(
            `${errorHasMessage(e) ? e.message : e} in clip ${i + 1}`
          );
        }
      }, this);
    } catch (e) {
      clipsFailed = e as { message: string }; // Stash the error
    }
    // End Sync section

    // Reconcile sync section with async section
    this.initializerTask
      .then(() => {
        if (clipsFailed) {
          throw clipsFailed;
        }
        this.hasLoaded = true;
        this.eventCb('loaded', {}); // Report async load completion.
      })
      .catch(e => {
        this.hasFailed = e;
        this.eventCb('error', { e }); // Report async errors.
      });
  }

  static setTransportTempo(valueBpm: number): void {
    Tone.Transport.bpm.value = valueBpm;
  }

  static startTransport(): void {
    Tone.start();
    Tone.Transport.start();
  }

  static stopTransport(deleteEvents = true): void {
    Tone.Transport.stop();
    if (deleteEvents) {
      // Delete all events in the Tone.Transport
      Tone.Transport.cancel();
    }
  }

  setVolume(volume: number): void {
    if (this.instrument) {
      this.instrument.volume.value = volume;
    }

    if (this.external) {
      this.external.setVolume?.(volume);
    }
  }

  startClip(idx: number, position?: number | string | ToneTicksValue): void {
    const clip = this.channelClips[idx];
    position = position || (position === 0 ? 0 : getNextPos(clip));
    // Stop any other currently running clip
    if (this.activePatternIdx > -1 && this.activePatternIdx !== idx) {
      this.stopClip(this.activePatternIdx, position);
    }

    if (clip && clip.state !== 'started') {
      // We need to schedule that for just before when clip?.start(position) events start coming.
      this.counterResetTask = Tone.Transport.scheduleOnce(
        (/* time: Tone.Seconds */) => {
          this.clipNoteCount = 0;
        },
        position
      );

      this.activePatternIdx = idx;
      clip?.start(position);
    }
  }

  stopClip(idx: number, position?: number | string | ToneTicksValue): void {
    const clip = this.channelClips[idx];
    position = position || (position === 0 ? 0 : getNextPos(clip));
    clip?.stop(position);
    if (idx === this.activePatternIdx) {
      this.activePatternIdx = -1;
    }
  }

  addClip(clipParams: ClipParams, idx?: number): void {
    idx = idx || this.channelClips.length;
    if (clipParams.pattern) {
      this.channelClips[idx as number] = clip(
        {
          ...clipParams,
        },
        this
      ) as ToneSequence;
      // Pass certain clipParams into getNextPos()
      const seq = this.channelClips[idx as number];
      if (seq && clipParams.align) seq.align = clipParams.align;
      if (seq && clipParams.alignOffset)
        seq.alignOffset = clipParams.alignOffset;
    } else {
      // Allow creation of empty clips
      this.channelClips[idx as number] = null;
    }
  }

  /**
   * @param  {Object} ClipParams clip parameters
   * @return {Function} function that can be used as the callback in Tone.Sequence https://tonejs.github.io/docs/Sequence
   */
  getSeqFn(params: ClipParams): SeqFn {
    return buildSequenceCallback(
      params,
      this,
      p => this.playerCb(p),
      (e, p) => this.eventCb(e, p)
    );
  }

  private eventCb(event: string, params: Record<string, unknown>): void {
    if (typeof this.eventCbFn === 'function') {
      params.channel = this;
      this.eventCbFn(event, params);
    }
  }

  private playerCb(params: Record<string, unknown>): void {
    if (typeof this.playerCbFn === 'function') {
      params.channel = this;
      this.playerCbFn(params);
    }
  }

  get clips(): (ToneSequence | null)[] {
    return this.channelClips;
  }

  get activeClipIdx(): number {
    return this.activePatternIdx;
  }
}
