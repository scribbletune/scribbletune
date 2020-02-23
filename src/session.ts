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
}
