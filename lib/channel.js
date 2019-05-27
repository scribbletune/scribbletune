"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clip_1 = require("./clip");
/**
 * Get the next logical position to play in the session
 * Tone has a build-in method `Tone.Transport.nextSubdivision('4n')`
 * but I think it s better to round off as follows for live performance
 */
const getNextPos = () => {
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
 * addClip ->
 */
class Channel {
    constructor(params) {
        (this.idx = params.idx), (this.activePatternIdx = -1);
        this.channelClips = [];
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
        params.clips.forEach((c) => {
            this.addClip({ ...c, ...originalParamsFiltered });
        }, this);
    }
    get clips() {
        return this.channelClips;
    }
    startClip(idx) {
        // Stop any other currently running clip
        if (this.activePatternIdx > -1 && this.activePatternIdx !== idx) {
            this.stopClip(this.activePatternIdx);
        }
        if (this.channelClips[idx] && this.channelClips[idx].state !== 'started') {
            this.activePatternIdx = idx;
            this.channelClips[idx].start(getNextPos());
        }
    }
    stopClip(idx) {
        this.channelClips[idx].stop(getNextPos());
    }
    addClip(clipParams, idx) {
        idx = idx || this.channelClips.length;
        if (clipParams.pattern) {
            this.channelClips[idx] = clip_1.clip(Object.assign({
                player: this.player,
                instrument: this.instrument,
                sampler: this.sampler,
            }, clipParams));
        }
        else {
            // Allow creation of empty clips
            this.channelClips[idx] = null;
        }
    }
    get activeClipIdx() {
        return this.activePatternIdx;
    }
}
exports.Channel = Channel;
