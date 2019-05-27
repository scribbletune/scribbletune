// global.window = true;
import * as fs from 'fs';
import { clip } from '../src/clip';
import { midi } from '../src/midi';
import { getScale } from '../src/scale';

describe('../src/midi', () => {
  it('writes a midi file', () => {
    const fileName = 'music.mid';
    const filePath = `./${fileName}`;
    const scribbleClip = clip({
      pattern: 'x[-x]',
      notes: getScale('C4 major') as string | (string | string[])[],
    });

    midi(scribbleClip, fileName);
    expect(fs.existsSync(filePath)).toBe(true);
    fs.unlinkSync(filePath);
  });

  it.skip('returns a byte string if fileName is null', () => {
    const scribbleClip = clip({
      pattern: 'x[-x]',
      notes: getScale('C4 major') as string | (string | string[])[],
    });
    expect(midi(scribbleClip, null)!.toString()).toBe(
      'MThd\x00\x00\x00\x06\x00\x00\x00\x01\x00MTrk\x00\x00\x00\r\x00<\x00<Z\x00ÿ/\x00'
    );
  });
});
