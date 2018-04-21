'use strict';

const Tone = require('tone');
const utils = require('./utils');

const getSeqFn = (player) => {
	return (time, el) => {
		if (el === 'x') {
			player.start(time);
		}
	}
};

const sequence = params => {
	return new Tone.Sequence(getSeqFn(params.player.toMaster()), utils.expandStr(params.pattern), params.subdiv || '4n');
}

/*
{sound: '/sounds/kick.wav', pattern: 'x---x---x---x---'}
*/
const loop = params => {
	const player = new Tone.Player(params.sound).toMaster();
	return new Tone.Sequence(getSeqFn(player), utils.expandStr(params.pattern), params.subdiv || '4n');
}

const getNextPos = () => {
	var m = +Tone.Transport.position.split(':')[0];
	return (m + 1) + ':0:0';
};

class Channel {
	constructor(params) {
		var player;
		this.idx = params.idx,
		this.activeClipIdx = -1;
		if (params.sound) {
			player = new Tone.Player(params.sound);
		}
		this._clips = params.loops.map((loop, i) => {
			if (loop.pattern) {
				return sequence({
					player,
					pattern: loop.pattern
				});
			} else {
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
		this._channels = arr.map((c, i) => {
			return new Channel(Object.assign({idx: i}, c));
		});
	}

	createChannel(channel) {
		this._channels.push(new Channel(Object.assign({
			idx: this._channels.length
		}, c)));
	}

	get channels() {
		return this._channels;
	}
}

const createSession = channels => {
	return new Session(channels);
}

module.exports = {
	sequence,
	getNextPos,
	createSession,
	loop
};