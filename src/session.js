'use strict';

const Tone = require('tone');
const utils = require('./utils');

class Channel {
	constructor(params) {
		this.idx = params.idx,
		this.activeClipIdx = -1;
		if (params.sound) {
			params.player = new Tone.Player(params.sound).toMaster();
		}
		if (player.synth) {
			params.instrument = new Tone[params.synth]().toMaster();
		}
		this._clips = params.loops.map((loop, i) => {
			if (loop.pattern) {
				return sequence({
					player,
					pattern: loop.pattern
				});
			} else {
				// Allow creation of empty clips
				return null;
			}
		});
	}

	get clips() {
		return this._clips;
	}
}

class Session {
	constructor(arr) {
		arr = arr || [];
		this._channels = arr.map((ch, i) => {
			return new Channel(Object.assign({idx: i}, ch));
		});
	}

	createChannel(ch) {
		this._channels.push(new Channel(Object.assign({
			idx: this._channels.length
		}, ch)));
	}

	get channels() {
		return this._channels;
	}
}

// Export method that allows creation of a session with channels
// Either channels can be added upfront as an array as the `channels` param
// Or can be later added with session.createChannel method
module.exports = channels => {
	return new Session(channels);
}