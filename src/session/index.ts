import { clip } from '../clip';

/**
 * Get the next logical position to play in the session
 * Tone has a build-in method `Tone.Transport.nextSubdivision('4n')`
 * but I think it s better to round off as follows for live performance
 */
const getNextPos = (): number | string => {
  var arr = Tone.Transport.position.split(':');
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
 * addClip ->
 */
class Channel {
  idx: number;
  _activePatternIdx: number;
  _clips: any;
  player: any;
  instrument: any;
  sampler: any;

  constructor(params: Params) {
    (this.idx = params.idx as number), (this._activePatternIdx = -1);
    this._clips = [];

    if (params.sample) {
      this.player = new Tone.Player(params.sample);
      this.player.toMaster();
    }
    if (params.synth) {
      this.instrument = new Tone[params.synth]();
      this.instrument.toMaster();
    }
    if (params.samples) {
      this.sampler = new Tone.Sampler(params.samples);
      this.sampler.toMaster();
    }

    // Filter out unrequired params and create clip params object
    const { clips, samples, sample, synth, ...originalParamsFiltered } = params;

    params.clips.forEach((c: any) => {
      this.addClip({ ...c, ...originalParamsFiltered });
    }, this);
  }

  get clips() {
    return this._clips;
  }

  startClip(idx: number) {
    // Stop any other currently running clip
    if (this._activePatternIdx > -1 && this._activePatternIdx !== idx) {
      this.stopClip(this._activePatternIdx);
    }

    if (this._clips[idx] && this._clips[idx].state !== 'started') {
      this._activePatternIdx = idx;
      this._clips[idx].start(getNextPos());
    }
  }

  stopClip(idx: number) {
    this._clips[idx].stop(getNextPos());
  }

  addClip(clipParams: any, idx?: number) {
    idx = idx || this._clips.length;
    if (clipParams.pattern) {
      this._clips[idx as number] = clip(
        Object.assign(
          {
            player: this.player, // will be ignored if undefined
            instrument: this.instrument, // will be ignored if undefined
            sampler: this.sampler, // will be ignored if undefined
          },
          clipParams
        )
      );
    } else {
      // Allow creation of empty clips
      this._clips[idx as number] = null;
    }
  }

  get activeClipIdx() {
    return this._activePatternIdx;
  }
}

export class Session {
  _channels: any;

  constructor(arr: any) {
    arr = arr || [];
    this._channels = arr.map((ch: any, i: number) => {
      ch.idx = ch.idx || i;
      return new Channel(ch);
    });
  }

  createChannel(ch: any) {
    ch.idx = ch.idx || this._channels.length;
    this._channels.push(new Channel(ch));
  }

  get channels() {
    return this._channels;
  }

  // Start the clips at a specific index in all the channels
  startRow(idx: number) {
    this._channels.forEach((ch: any) => {
      ch.startClip(idx);
    });
  }
}
