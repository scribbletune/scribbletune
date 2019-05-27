import { Channel } from './channel';

export class Session {
  sessionChannels: any;

  constructor(arr: any) {
    arr = arr || [];
    this.sessionChannels = arr.map((ch: any, i: number) => {
      ch.idx = ch.idx || i;
      return new Channel(ch);
    });
  }

  createChannel(ch: any) {
    ch.idx = ch.idx || this.sessionChannels.length;
    this.sessionChannels.push(new Channel(ch));
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
