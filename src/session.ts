import { Channel } from './channel';

export class Session {
  sessionChannels: Channel[];

  constructor(arr: ChannelParams[]) {
    arr = arr || [];
    this.sessionChannels = arr.map((ch: ChannelParams, i: number) => {
      ch.idx = ch.idx || i;
      return new Channel(ch);
    });
  }

  createChannel(ch: ChannelParams) {
    ch.idx = ch.idx || this.sessionChannels.length;
    const newChannel = new Channel(ch);
    this.sessionChannels.push(newChannel);
    return newChannel;
  }

  get channels() {
    return this.sessionChannels;
  }

  // Start the clips at a specific index in all the channels
  startRow(idx: number) {
    this.sessionChannels.forEach((ch: any) => {
      ch.startClip(idx);
    });
  }

  play(params: PlayParams) {
    const channelPatterns = params.channelPatterns;
    const clipDuration = params.clipDuration || '4:0:0';
    const clipDurationInSeconds: number = Tone.Time(clipDuration).toSeconds();

    const stopClips = (clips: any[], time: number) => {
      clips.forEach((c) => c.stop(time));
    };

    const startClips = (
      channelIdx: string | number,
      clipIdx: string,
      time: number
    ): any[] => {
      return clipIdx === '-'
        ? []
        : this.channels
            .filter((c) => c.idx === channelIdx)
            .map((c) => c.clips[clipIdx].start(time));
    };

    channelPatterns.forEach(({ channelIdx, pattern }: ChannelPattern) => {
      let clips: any[] = [];
      let time: number = 0;
      let prevClipIdx: string = '-';
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
