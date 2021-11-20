import { Channel } from './channel';

export class Session {
  sessionChannels: Channel[];

  constructor(arr: ChannelParams[]) {
    arr = arr || [];
    this.sessionChannels = arr.map((ch: ChannelParams, i: number) => {
      // Make sure ch.idx is not empty and unique in this.sessionChannels
      ch.idx = ch.idx || i;
      ch.idx = this.uniqueIdx(this.sessionChannels, ch.idx);
      return new Channel(ch);
    });
  }

  // Return unique idx for given channels
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

  createChannel(ch: ChannelParams): Channel {
    // Make sure ch.idx is unique in this.sessionChannels
    ch.idx = this.uniqueIdx(this.sessionChannels, ch.idx);
    const newChannel = new Channel(ch);
    this.sessionChannels.push(newChannel);
    return newChannel;
  }

  get channels(): Channel[] {
    return this.sessionChannels;
  }

  setTransportTempo(valueBpm: number): void {
    Channel.setTransportTempo(valueBpm);
  }

  startTransport(): void {
    Channel.startTransport();
  }

  stopTransport(deleteEvents = true): void {
    Channel.stopTransport(deleteEvents);
  }

  // Start the clips at a specific index in all the channels
  startRow(idx: number): void {
    this.sessionChannels.forEach((ch: any) => {
      ch.startClip(idx);
    });
  }

  play(params: PlayParams): void {
    const channelPatterns = params.channelPatterns;
    const clipDuration = params.clipDuration || '4:0:0';
    const clipDurationInSeconds: number = Tone.Time(clipDuration).toSeconds();

    const stopClips = (clips: any[], time: number) => {
      clips.forEach(c => c.stop(time));
    };

    const startClips = (
      channelIdx: string | number,
      clipIdx: string,
      time: number
    ): any[] => {
      return clipIdx === '-'
        ? []
        : this.channels
            .filter(c => c.idx === channelIdx)
            .map(c => c.clips[clipIdx as keyof Channel['clips']]?.start(time));
    };

    channelPatterns.forEach(({ channelIdx, pattern }: ChannelPattern) => {
      let clips: any[] = [];
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
