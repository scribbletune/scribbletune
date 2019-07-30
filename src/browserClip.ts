import { expandStr } from './utils';
const defaultSubdiv = '4n';
const defaultDur = '8n';

const random = (num = 1) => Math.round(Math.random() * num);

/**
 * @param  {Tone.js Player Object}
 * @return {Function}
 * Take a Tone.js Player and return a function that can be used
 * as the callback in Tone.Sequence https://tonejs.github.io/docs/r12/Sequence
 */
const getPlayerSeqFn = (player: any): SeqFn => {
  return (time: string, el: string) => {
    if (el === 'x' || (el === 'R' && random())) {
      player.start(time);
    }
  };
};

/**
 * @param  {Object}
 * @return {Function}
 * Take an object literal which has a Tone.js instrument and return a function that can be used
 * as the callback in Tone.Sequence https://tonejs.github.io/docs/r12/Sequence
 */
const getInstrSeqFn = (params: ClipParams): SeqFn => {
  let counter = 0;
  return (time: string, el: string) => {
    if (
      (el === 'x' && params.notes[counter]) ||
      (el === 'R' && !params.randomNotes && random()) ||
      (el === 'R' && params.randomNotes)
    ) {
      params.instrument.triggerAttackRelease(
        el === 'R' && params.randomNotes
          ? params.randomNotes[random(params.randomNotes.length - 1)]
          : params.notes[counter],
        params.dur || params.subdiv || defaultDur,
        time
      );
      counter++;
      if (counter === params.notes.length) {
        counter = 0;
      }
    }
  };
};

/**
 * @param  {Object}
 * @return {Function}
 * Take an object literal which has a Tone.js instrument and return a function that can be used
 * as the callback in Tone.Sequence https://tonejs.github.io/docs/r12/Sequence
 */
const getMonoInstrSeqFn = (params: ClipParams): SeqFn => {
  let counter = 0;
  return (time: string, el: string) => {
    if (
      (el === 'x' && params.notes[counter]) ||
      (el === 'R' && !params.randomNotes && random()) ||
      (el === 'R' && params.randomNotes)
    ) {
      // in monophonic instruments the triggerAttackRelease takes the note directly
      // In Scribbletune each note is an array by default to support chords
      // hence we target the 0th element of each note
      params.instrument.triggerAttackRelease(
        el === 'R' && params.randomNotes
          ? params.randomNotes[random(params.randomNotes.length - 1)]
          : params.notes[counter][0],
        params.dur || params.subdiv || defaultDur,
        time
      );
      counter++;
      if (counter === params.notes.length) {
        counter = 0;
      }
    }
  };
};

/**
 * @param  {Object}
 * @return {Function}
 * Take an object literal which has a Tone.js sampler and return a function that can be used
 * as the callback in Tone.Sequence https://tonejs.github.io/docs/r12/Sequence
 */
const getSamplerSeqFn = (params: ClipParams) => {
  let counter = 0;
  return (time: string, el: string) => {
    if (
      (el === 'x' && params.notes[counter]) ||
      (el === 'R' && !params.randomNotes && random()) ||
      (el === 'R' && params.randomNotes)
    ) {
      params.sampler.triggerAttackRelease(
        el === 'R' && params.randomNotes
          ? params.randomNotes[random(params.randomNotes.length - 1)]
          : params.notes[counter],
        params.dur || params.subdiv || defaultDur,
        time
      );
      counter++;
      if (counter === params.notes.length) {
        counter = 0;
      }
    }
  };
};

/**
 * @param  {Object}
 * @return {Tone.js Sequence Object}
 * Take a object literal that may have a Tone.js player OR instrument
 * or simply a sample or synth with a pattern and return a Tone.js sequence
 */
module.exports = (params: ClipParams) => {
  if (!params.pattern) {
    throw new Error('No pattern provided!');
  }

  if (
    !params.player &&
    !params.instrument &&
    !params.sample &&
    !params.buffer &&
    !params.synth &&
    !params.sampler &&
    !params.samples
  ) {
    throw new Error('No player or instrument provided!');
  }

  /*
	1. The params object can be used to pass a sample (sound source) OR a synth(Synth/FMSynth/AMSynth etc) or samples.
	Scribbletune will then create a Tone.js Player or Tone.js Instrument or Tone.js Sampler respectively
	2. It can also be used to pass a Tone.js Player object or instrument that was created elsewhere
	(mostly by Scribbletune itself in the channel creation method)
	Either ways, a pattern is required and it will be used to create a playable Tone.js Sequence
	 */

  let effects = [];

  if (params.effects) {
    effects = params.effects.map((eff: any) => new Tone[eff]());
  }

  if (params.sample || params.buffer) {
    // This implies, the clip is probably being hand created by the user with a audio sample
    params.player = new Tone.Player(params.sample || params.buffer);
  }

  if (params.samples) {
    params.sampler = new Tone.Sampler(params.samples);
  }

  if (params.synth) {
    // This implies, the synth is probably being hand created by the user with an available Tone synth
    params.instrument = new Tone[params.synth]();
  }

  if (params.player) {
    if (params.volume) {
      params.player.volume.value = params.volume;
    }
    params.player.chain(...effects, Tone.Master);
    // This implies, a player object was already created (either by user or by Scribbletune during channel creation)
    return new Tone.Sequence(
      getPlayerSeqFn(params.player),
      expandStr(params.pattern),
      params.subdiv || defaultSubdiv
    );
  }

  if (params.sampler) {
    if (params.volume) {
      params.sampler.volume.value = params.volume;
    }
    params.sampler.chain(...effects, Tone.Master);
    // This implies, a sampler object was already created (either by user or by Scribbletune during channel creation)
    return new Tone.Sequence(
      getSamplerSeqFn(params),
      expandStr(params.pattern),
      params.subdiv || defaultSubdiv
    );
  }

  if (params.instrument) {
    if (params.volume) {
      params.instrument.volume.value = params.volume;
    }
    params.instrument.chain(...effects, Tone.Master);
    // This implies, the instrument was already created (either by user or by Scribbletune during channel creation)
    // Unlike player, the instrument needs the entire params object to construct a sequence
    return new Tone.Sequence(
      params.instrument.voices
        ? getInstrSeqFn(params)
        : getMonoInstrSeqFn(params),
      expandStr(params.pattern),
      params.subdiv || defaultSubdiv
    );
  }
};
