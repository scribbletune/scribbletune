const loop = require('./loop');

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
		this.idx = params.idx,
		this._activePatternIdx = -1;
		this._clips = [];

		if (params.sample) {
			this.player = new Tone.Player(params.sample);
			this.player.toMaster();
		}
		if (params.synth) {
			this.instrument = new Tone[params.synth]();
			this.instrument.toMaster();
		}
		params.clips.forEach(this.addClip, this);
	}

	get clips() {
		return this._clips;
	}

	startClip(idx) {
		// Stop any other currently running clip
		if (this._activePatternIdx > -1 && this._activePatternIdx !== idx) {
			this.stopClip(this._activePatternIdx);
		}

		if (this._clips[idx] && this._clips[idx].state !== 'started') {
			this._activePatternIdx = idx;
			let when = Tone.Transport.nextSubdivision('4n');
			this._clips[idx].start(when);
		}
	}

	stopClip(idx) {
		this._clips[idx].stop(Tone.Transport.nextSubdivision('4n'));
	}

	addClip(clipParams, idx) {
		idx = idx || this._clips.length;
		if (clipParams.pattern) {
			this._clips[idx] = loop(Object.assign({
				player: this.player, // will be ignored if undefined
				instrument: this.instrument // will be ignored if undefined
			}, clipParams));
		} else {
			// Allow creation of empty clips
			this._clips[idx] = null;
		}
	}

	get activeClipIdx() {
		return this._activePatternIdx;
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

	// Start the clips at a specific index in all the channels
	startRow(idx) {
		this._channels.forEach(ch => {
			ch.startClip(idx);
		});
	}
}

// Export method that allows creation of a session with channels
// Either channels can be added upfront as an array as the `channels` param
// Or can be later added with session.createChannel method
module.exports = channels => {
	return new Session(channels);
};
