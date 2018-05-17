'use strict';

const Tone = typeof window !== 'undefined' && require('tone');
const utils = require('./utils');
const defaultSubdiv = '4n';

/**
 * @param  {Tone.js Player Object}
 * @return {Function}
 * Take a Tone.js Player and return a function that can be used
 * as the callback in Tone.Sequence https://tonejs.github.io/docs/r12/Sequence
 */
const _getPlayerSeqFn = (player) => {
	return (time, el) => {
		if (el === 'x') {
			player.start(time);
		}
	}
};

/**
 * @param  {Object}
 * @return {Function}
 * Take an object literal which has a Tone.js instrument and return a function that can be used
 * as the callback in Tone.Sequence https://tonejs.github.io/docs/r12/Sequence
 */
const _getInstrSeqFn = (params) => {
	var counter = 0;

	return (time, el) => {
		if (el === 'x') {
			params.instrument.triggerAttackRelease(params.notes[counter], '8n', time);
			counter++;
			if (counter === params.notes.length) {
				counter = 0;
			}
		}
	}
};

/**
 * @param  {Object}
 * @return {Tone.js Sequence Object}
 * Take a object literal that may have a Tone.js player OR instrument
 * or simply a sample or synth with a pattern and return a Tone.js sequence
 */
module.exports = params => {
	if (!params) {
		throw new Error('No input params provided for sequence!');
	}

	if (!params.pattern) {
		throw new Error('No pattern provided!');
	}

	if (!params.player && !params.instrument && !params.sample && !params.synth) {
		throw new Error('No player or instrument provided!');
	}

	/*
	1. The params object can be used to pass a sample (sound source) OR a synth(Synth/FMSynth/AMSynth etc).
	Scribbletune will then create a Tone.js Player or Tone.js Instrument respectively
	2. It can also be used to pass a Tone.js Player object or instrument that was created elsewhere
	(mostly by Scribbletune itself in the channel creation method)
	Either ways, a pattern is required and it will be used to create a playable Tone.js Sequence
	 */
	if (params.sample) {
		// This implies, the loop is probably being hand created by the user with a audio sample
		params.player = new Tone.Player(params.sample).toMaster();
	}

	if (params.player) {
		// This implies, a player object was already created (either by user or mostly by Scribbletune during channel creation)
		return new Tone.Sequence(_getPlayerSeqFn(params.player), utils.expandStr(params.pattern), defaultSubdiv);
	}

	if (params.synth) {
		// This implies, the synth is probably being hand created by the user with an available Tone synth
		params.instrument = new Tone[params.synth]().toMaster();
	}

	if (params.instrument) {
		// This implies, the instrument was already created (either by user or mostly by Scribbletune during channel creation)
		// Unlike player, the instrument needs the entire params object to construct a sequence
		return new Tone.Sequence(_getInstrSeqFn(params), utils.expandStr(params.pattern), defaultSubdiv);
	}
};
