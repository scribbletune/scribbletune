import type { ChannelParams } from '../types';
import { recreateToneObjectInContext } from './instrument-factory';

/** Create effects from channel params and chain them onto the instrument. */
export function initEffects(
  instrument: ToneInstrument,
  context: ToneAudioContext,
  params: ChannelParams
): Promise<void> {
  context = context || Tone.getContext();

  const createEffect = (effect: string | ToneNode): Promise<ToneNode> => {
    return new Promise<ToneNode>((resolve, _reject) => {
      if (typeof effect === 'string') {
        resolve(
          new (Tone as unknown as ToneDynamic)[effect]({
            context,
          }) as unknown as ToneNode
        );
      } else if (effect.context !== context) {
        return recreateToneObjectInContext(
          effect as unknown as ToneInstrument,
          context
        );
      } else {
        resolve(effect);
      }
    }).then(effectOut => {
      return effectOut.toDestination();
    });
  };

  const startEffect = (eff: ToneNode) => {
    return typeof eff.start === 'function' ? eff.start() : eff;
  };

  const toArray = <T>(someVal: T | T[] | undefined): T[] => {
    if (!someVal) {
      return [];
    }
    if (Array.isArray(someVal)) {
      return someVal;
    }
    return [someVal];
  };

  const effectsIn = toArray(params.effects);
  if (params.external) {
    if (effectsIn.length !== 0) {
      throw new Error('Effects cannot be used with external output');
    }
    return Promise.resolve();
  }

  return Promise.all(effectsIn.map(createEffect))
    .then(results => results.map(startEffect))
    .then(effects => {
      instrument.chain(...effects).toDestination();
    });
}
