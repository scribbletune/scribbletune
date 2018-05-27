'use strict';

const Tone = typeof window !== 'undefined' && require('tone');
const utils = require('./utils');
const loop = require('./loop');
const Presets = require('Presets');

/**
 * Get the next position to stop the current clip(s) and start the next clip(s)
 * @return {Number|String} The position on the timeline
 */
const getNextPos = () => {
	var arr = Tone.Transport.position.split(':');
	// If we are still around 0:0:0x, then set start position to 0
	if (arr[0] === '0' && arr[1] === '0') {
		return 0;
	}
	// Else set it to the next bar
	return (+arr[0] + 1) + ':0:0';
};

/**
 * Effects are provided as an array while creating a Channel. 
 * They need to be chained one to the other in the order they appear all leading to the Master audio.
 * For instance ['Delay', 'Reverb', 'EffectName:PresetName'] would be chained as
 * Delay -> Reverb -> EffectName -> Master
 * @param  {Array} effects
 * @return {Tone.js Object}
 */
const wireUpEffects = effects => {
	if (!effects) {
		return;
	}
	let eff, effectName, endpoint, presetJson;
	while (effects.length) {
		effectName = effects.pop();
		if (effectName.includes(':')) {
			presetJson = Presets.effect(effectName);
			effectName = effectName.split(':')[0];
		}
		eff = new Tone[effectName](presetJson);
		if (endpoint) {
			eff.connect(endpoint);
		} else {
			eff.toMaster();
		}
		endpoint = eff;
		presetJson = undefined;
	}

	// Return the first effect from the chain
	// The Channel class will connect it's Player or Instrument to this
	return endpoint;
}

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
		let endpoint = wireUpEffects(params.effects);

		if (params.sample) {
			this.player = new Tone.Player(params.sample);
			if (endpoint) {
				this.player.connect(endpoint);
			} else {
				this.player.toMaster();
			}
		}
		if (params.synth) {
			let presetJson, synth = params.synth;
			if (params.synth.includes(':')) {
				presetJson = Presets.instrument(params.synth);
				synth = params.synth.split(':')[0];
			}
			this.instrument = new Tone[synth](presetJson);
			if (endpoint) {
				this.instrument.connect(endpoint);
			} else {
				this.instrument.toMaster();
			}
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
			let when = getNextPos();
			this._clips[idx].start(when);
		}
	}

	stopClip(idx) {
		this._clips[idx].stop(getNextPos());
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
}