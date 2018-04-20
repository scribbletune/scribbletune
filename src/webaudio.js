'use strict';

const Tone = require('tone');

const getSeqFn = (player) => {
	return (time, el) => {
		if (el === 'x') {
			player.start(time);
		}
	}
};

const expandStr = (str) => {
	str = JSON.stringify(str.split(''));
	str = str.replace(/,"\[",/g, ', [');
	str = str.replace(/"\[",/g, '[');
	str = str.replace(/,"\]"/g, ']');
	return JSON.parse(str);
};

const player = sample => (new Tone.Player(sample));

const sequence = params => {
	return new Tone.Sequence(getSeqFn(params.player.toMaster()), expandStr(params.pattern), params.subdiv || '4n');
}

const getNextPos = () => {
	var m = +Tone.Transport.position.split(':')[0];
	return (m + 1) + ':0:0';
};

module.exports = {
	player,
	sequence,
	getNextPos
};