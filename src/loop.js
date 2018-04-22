'use strict';

const Tone = require('tone');
const utils = require('./utils');
const defaultSubdiv = '4n';

const getPlayerSeqFn = (player) => {
	return (time, el) => {
		if (el === 'x') {
			player.start(time);
		}
	}
};

const getInstrSeqFn = (params) => {
	var counter = 0;

	return (time, el) => {
		if (el === 'x') {
			params.instrument.triggerAttackRelease(params.notes[counter]);
			counter++;
			if (counter === params.notes.length) {
				counter = 0;
			}
		}
	}
};

/*
Pass parameters to get a playable Tone sequence
*/
module.exports = params => {
	if (!params || !params.pattern) {
		throw new Error('Loop must be created with a pattern');
	}

	// params could already have a player or instrument (set by Scribbletune during channel creation)
	// params may not have either and hence would have the means to create a new player or new instrument
	// via `sound` (a path to a audio file) or a `synth` (from the various synths available in Tone.js)
	if (params.sound) {
		// This implies, the loop is probably being hand created by the user with a audio sample
		params.player = new Tone.Player(params.sound).toMaster();
	}

	if (params.player) {
		// This implies, a player object was already created (either by user or mostly by Scribbletune during channel creation)
		return new Tone.Sequence(getPlayerSeqFn(params.player), utils.expandStr(params.pattern), defaultSubdiv);
	}

	if (params.synth) {
		// This implies, the synth is probably being hand created by the user with an available Tone synth
		params.instrument = new Tone[params.synth]().toMaster();
	}

	if (params.instrument) {
		// This implies, the instrument is created (either by user or mostly by Scribbletune during channel creation)
		// Unlike player, the instrument needs the entire params object to construct a sequence
		return new Tone.Sequence(getInstrSeqFn(params), utils.expandStr(params.pattern), defaultSubdiv);
	}
};
