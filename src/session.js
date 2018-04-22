'use strict';

const Tone = require('tone');
const utils = require('./utils');
const loop = require('./loop');

const getNextPos = () => {
	var m = +Tone.Transport.position.split(':')[0];
	return (m + 1) + ':0:0';
};

class Channel {
	constructor(params) {
		this.idx = params.idx,
		this._activeClipIdx = -1;
		this._clips = [];
		if (params.sound) {
			this.player = new Tone.Player(params.sound).toMaster();
		}
		if (params.synth) {
			this.instrument = new Tone[params.synth]().toMaster();
		}
		params.loops.forEach(this.addLoop, this);
	}

	get clips() {
		return this._clips;
	}

	startClip(idx, when) {
		// Stop any currently running clip
		if (this._activeClipIdx > -1) {
			this.stopClip(this._activeClipIdx);
		}
		this._activeClipIdx = idx;
		this._clips[idx].start(typeof when === 'undefined' ?  getNextPos() : when);
	}

	stopClip(idx) {
		this._clips[idx].stop(typeof when === 'undefined' ?  getNextPos() : when);
	}

	addLoop(loopParams, idx) {
		idx = idx || this._clips.length;
		if (loopParams.pattern) {
			this._clips[idx] = loop(Object.assign({
				player: this.player, // will be ignored if undefined
				instrument: this.instrument // will be ignored if undefined
			}, loopParams));
		} else {
			// Allow creation of empty clips
			this._clips[i] = null;
		}
	}
}

class Session {
	constructor(arr) {
		arr = arr || [];
		this._channels = arr.map((ch, i) => {
			ch.idx = ch.idx || i;
			return new Channel(ch);
		});
	}

	createChannel(ch) {
		ch.idx = ch.idx || this._channels.length;
		this._channels.push(new Channel(ch));
	}

	get channels() {
		return this._channels;
	}

	start() {
		Tone.Transport.start();
	}

	stop() {
		Tone.Transport.stop();
	}
}

// Export method that allows creation of a session with channels
// Either channels can be added upfront as an array as the `channels` param
// Or can be later added with session.createChannel method
module.exports = channels => {
	return new Session(channels);
}