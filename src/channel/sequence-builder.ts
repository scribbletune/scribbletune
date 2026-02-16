import { getDuration, getNote } from '../browser-clip';
import type { ClipParams, SeqFn } from '../types';

/** Subset of Channel properties needed by the sequence callback. */
export interface SequenceHost {
  instrument: ToneInstrument;
  external?: ExternalOutput;
  hasLoaded: boolean;
  clipNoteCount: number;
}

/**
 * Build the callback function for a Tone.Sequence based on the instrument type.
 * Returns a function that triggers notes/samples at each step of the sequence.
 */
export function buildSequenceCallback(
  params: ClipParams,
  host: SequenceHost,
  playerCb: (params: Record<string, unknown>) => void,
  eventCb: (event: string, params: Record<string, unknown>) => void
): SeqFn {
  if (host.external) {
    const ext = host.external;
    return (time: string, el: string) => {
      if (el === 'x' || el === 'R') {
        const counter = host.clipNoteCount;
        if (host.hasLoaded) {
          const note = getNote(el, params, counter)[0] as string;
          const duration = getDuration(params, counter);
          const durSeconds = Tone.Time(duration).toSeconds();
          playerCb({ note, duration, time, counter });
          try {
            ext.triggerAttackRelease?.(note, durSeconds, time);
          } catch (e) {
            eventCb('error', { e }); // Report play errors.
          }
        }
        host.clipNoteCount++;
      }
    };
  }

  if (host.instrument instanceof Tone.Player) {
    return (time: string, el: string) => {
      if (el === 'x' || el === 'R') {
        const counter = host.clipNoteCount;
        if (host.hasLoaded) {
          playerCb({ note: '', duration: '', time, counter });
          try {
            host.instrument.start(time);
          } catch (e) {
            eventCb('error', { e }); // Report play errors.
          }
        }
        host.clipNoteCount++;
      }
    };
  }

  if (
    host.instrument instanceof Tone.PolySynth ||
    host.instrument instanceof Tone.Sampler
  ) {
    return (time: string, el: string) => {
      if (el === 'x' || el === 'R') {
        const counter = host.clipNoteCount;
        if (host.hasLoaded) {
          const note = getNote(el, params, counter) as string | string[];
          const duration = getDuration(params, counter);
          playerCb({ note, duration, time, counter });
          try {
            host.instrument.triggerAttackRelease(note, duration, time);
          } catch (e) {
            eventCb('error', { e }); // Report play errors.
          }
        }
        host.clipNoteCount++;
      }
    };
  }

  if (host.instrument instanceof Tone.NoiseSynth) {
    return (time: string, el: string) => {
      if (el === 'x' || el === 'R') {
        const counter = host.clipNoteCount;
        if (host.hasLoaded) {
          const duration = getDuration(params, counter);
          playerCb({ note: '', duration, time, counter });
          try {
            (host.instrument as Tone.NoiseSynth).triggerAttackRelease(
              duration,
              time
            );
          } catch (e) {
            eventCb('error', { e }); // Report play errors.
          }
        }
        host.clipNoteCount++;
      }
    };
  }

  return (time: string, el: string) => {
    if (el === 'x' || el === 'R') {
      const counter = host.clipNoteCount;
      if (host.hasLoaded) {
        const note = getNote(el, params, counter)[0] as string;
        const duration = getDuration(params, counter);
        playerCb({ note, duration, time, counter });
        try {
          host.instrument.triggerAttackRelease(note, duration, time);
        } catch (e) {
          eventCb('error', { e }); // Report play errors.
        }
      }
      host.clipNoteCount++;
    }
  };
}
