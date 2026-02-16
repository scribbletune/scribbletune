import { Channel } from './channel';
import type { ChannelParams, ChannelPattern, PlayParams } from './types';

/**
 * A Session manages multiple Channels and coordinates clip playback
 * across them, similar to a scene/row in a DAW.
 */
export class Session {
  sessionChannels: Channel[];

  /** Create a session, optionally pre-populated with channels. */
  constructor(arr: ChannelParams[]) {
    arr = arr || [];
    this.sessionChannels = arr.map((ch: ChannelParams, i: number) => {
      // Make sure ch.idx is not empty and unique in this.sessionChannels
      ch.idx = ch.idx || i;
      ch.idx = this.uniqueIdx(this.sessionChannels, ch.idx);
      return new Channel(ch);
    });
  }

  /** Return a unique channel index, generating a new one if `idx` is taken or missing. */
  uniqueIdx(channels: Channel[], idx?: string | number): string | number {
    if (!channels) {
      return idx || 0;
    }
    // Channel idx's
    const idxs = channels.reduce((acc: (string | number)[], c) => {
      return (!acc.find(i => i === c.idx) && acc.concat(c.idx)) || acc;
    }, []);

    if (!idx || idxs.find(i => i === idx)) {
      let newIdx = channels.length;
      while (idxs.find(i => i === newIdx)) {
        newIdx = newIdx + 1;
      }
      return newIdx;
    }

    return idx;
  }

  /** Create a new channel with a unique index and add it to the session. */
  createChannel(ch: ChannelParams): Channel {
    // Make sure ch.idx is unique in this.sessionChannels
    ch.idx = this.uniqueIdx(this.sessionChannels, ch.idx);
    const newChannel = new Channel(ch);
    this.sessionChannels.push(newChannel);
    return newChannel;
  }

  /** All channels in this session. */
  get channels(): Channel[] {
    return this.sessionChannels;
  }

  /** Set the global transport tempo in BPM. */
  setTransportTempo(valueBpm: number): void {
    Channel.setTransportTempo(valueBpm);
  }

  /** Resume the audio context and start the global transport. */
  startTransport(): void {
    Channel.startTransport();
  }

  /**
   * Stop the global transport.
   * @param deleteEvents - If true (default), cancels all scheduled transport events.
   */
  stopTransport(deleteEvents = true): void {
    Channel.stopTransport(deleteEvents);
  }

  /** Start the clip at the given index across all channels simultaneously. */
  startRow(idx: number): void {
    this.sessionChannels.forEach((ch: Channel) => {
      ch.startClip(idx);
    });
  }

  /**
   * Schedule clip playback across channels using a song-structure pattern.
   * Each channel pattern is a string where each character is a clip index
   * (or `-` for silence, `_` to sustain the previous clip).
   */
  play(params: PlayParams): void {
    const channelPatterns = params.channelPatterns;
    const clipDuration = params.clipDuration || '4:0:0';
    const clipDurationInSeconds: number = Tone.Time(clipDuration).toSeconds();

    const stopClips = (clips: ToneSequence[], time: number) => {
      clips.forEach(c => {
        c.stop(time);
      });
    };

    const startClips = (
      channelIdx: string | number,
      clipIdx: string,
      time: number
    ): ToneSequence[] => {
      if (clipIdx === '-') return [];
      const clips = this.channels
        .filter(c => c.idx === channelIdx)
        .map(c => c.clips[Number(clipIdx)])
        .filter((c): c is ToneSequence => c != null);
      for (const c of clips) c.start(time);
      return clips;
    };

    channelPatterns.forEach(({ channelIdx, pattern }: ChannelPattern) => {
      let clips: ToneSequence[] = [];
      let time = 0;
      let prevClipIdx = '-';
      pattern.split('').forEach((clipIdx: string) => {
        if (clipIdx !== prevClipIdx && clipIdx !== '_') {
          stopClips(clips, time);
          clips = startClips(channelIdx, clipIdx, time);
        }
        prevClipIdx = clipIdx;
        time += clipDurationInSeconds;
      });
      stopClips(clips, time);
    });
  }
}
