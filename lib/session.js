"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const channel_1 = require("./channel");
class Session {
    constructor(arr) {
        arr = arr || [];
        this.sessionChannels = arr.map((ch, i) => {
            ch.idx = ch.idx || i;
            return new channel_1.Channel(ch);
        });
    }
    createChannel(ch) {
        ch.idx = ch.idx || this.sessionChannels.length;
        this.sessionChannels.push(new channel_1.Channel(ch));
    }
    get channels() {
        return this.sessionChannels;
    }
    // Start the clips at a specific index in all the channels
    startRow(idx) {
        this.sessionChannels.forEach((ch) => {
            ch.startClip(idx);
        });
    }
}
exports.Session = Session;
