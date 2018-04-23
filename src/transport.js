'use strict';
const Tone = require('tone');

module.exports = {
	start: bpm => {
		Tone.Transport.bpm.value = bpm || 120;
		Tone.Transport.start();
	},

	stop: () => {
		Tone.Transport.stop();
	}
};