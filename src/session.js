const clip = require('./clip');
const browserClip = require('./browserClip');

/**
 * Get the next logical position to play in the session
 * Tone has a build-in method `Tone.Transport.nextSubdivision('4n')`
 * but I think it s better to round off as follows for live performance
 */
const getNextPos = () => {
  var arr = Tone.Transport.position.split(':');
  // If we are still around 0:0:0x, then set start position to 0
  if (arr[0] === '0' && arr[1] === '0') {
    return 0;
  }
  // Else set it to the next bar
  return (+arr[0] + 1) + ':0:0';
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
		const {clips, samples, sample, synth, ...originalParamsFiltered} = params;

		params.clips.forEach((c) => {
			this.addClip({...c, ...originalParamsFiltered});
		}, this);
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
			this._clips[idx].start(getNextPos());
		}
	}

	stopClip(idx) {
		this._clips[idx].stop(getNextPos());
	}

	addClip(clipParams, idx) {
		idx = idx || this._clips.length;
		if (clipParams.pattern) {
			this._clips[idx] = clip(Object.assign({
				player: this.player, // will be ignored if undefined
				instrument: this.instrument, // will be ignored if undefined
				sampler: this.sampler // will be ignored if undefined
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
