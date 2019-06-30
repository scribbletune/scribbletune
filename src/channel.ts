import { clip } from './clip';

/**
 * Get the next logical position to play in the session
 * Tone has a build-in method `Tone.Transport.nextSubdivision('4n')`
 * but I think it s better to round off as follows for live performance
 */
const getNextPos = (): number | string => {
  const arr = Tone.Transport.position.split(':');
  // If we are still around 0:0:0x, then set start position to 0
  if (arr[0] === '0' && arr[1] === '0') {
    return 0;
  }
  // Else set it to the next bar
  return +arr[0] + 1 + ':0:0';
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
  idx: number;
  activePatternIdx: number;
  channelClips: any;
  player: any;
  instrument: any;
  sampler: any;

  constructor(params: ChannelParams) {
    (this.idx = params.idx as number), (this.activePatternIdx = -1);
    this.channelClips = [];

    if (params.sample) {
      this.player = new Tone.Player(params.sample);
    }
    if (params.synth) {
      this.instrument = new Tone[params.synth]();
    }
    if (params.samples) {
      this.sampler = new Tone.Sampler(params.samples);
    }

    // Filter out unrequired params and create clip params object
    const { clips, samples, sample, synth, ...originalParamsFiltered } = params;

    params.clips.forEach((c: any) => {
      this.addClip({ ...c, ...originalParamsFiltered });
    }, this);
  }

  get clips() {
    return this.channelClips;
  }

  startClip(idx: number) {
    // Stop any other currently running clip
    if (this.activePatternIdx > -1 && this.activePatternIdx !== idx) {
      this.stopClip(this.activePatternIdx);
    }

    if (this.channelClips[idx] && this.channelClips[idx].state !== 'started') {
      this.activePatternIdx = idx;
      this.channelClips[idx].start(getNextPos());
    }
  }

  stopClip(idx: number) {
    this.channelClips[idx].stop(getNextPos());
  }

  addClip(clipParams: any, idx?: number) {
    idx = idx || this.channelClips.length;
    if (clipParams.pattern) {
      this.channelClips[idx as number] = clip({
        player: this.player, // will be ignored if undefined
        instrument: this.instrument, // will be ignored if undefined
        sampler: this.sampler, // will be ignored if undefined
        ...clipParams,
      });
    } else {
      // Allow creation of empty clips
      this.channelClips[idx as number] = null;
    }
  }

  get activeClipIdx() {
    return this.activePatternIdx;
  }
}
