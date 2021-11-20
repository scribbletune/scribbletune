import * as fs from 'fs';
import { clip } from '../src/clip';
import { midi } from '../src/midi';
import { scale } from 'harmonics';

describe('../src/midi', () => {
  it('writes a midi file', () => {
    const fileName = 'music.mid';
    const filePath = `./${fileName}`;
    const scribbleClip = clip({
      pattern: 'x[-x]',
      notes: scale('C4 major') as string | (string | string[])[],
    });

    midi(scribbleClip, fileName);
    expect(fs.existsSync(filePath)).toBe(true);
    fs.unlinkSync(filePath);
  });

  it.skip('returns a byte string if fileName is null', () => {
    const scribbleClip = clip({
      pattern: 'x[-x]',
      notes: scale('C4 major') as string | (string | string[])[],
    });
    expect(midi(scribbleClip, null)?.toString()).toBe(
      'MThd\x00\x00\x00\x06\x00\x00\x00\x01\x00MTrk\x00\x00\x00\r\x00<\x00<Z\x00ÿ/\x00'
    );
  });

  it('accepts an optional bpm argument', () => {
    // small util to convert the midi data to an array of ascii codes
    const convertBytesToAsciiArray = (bytes: string) => {
      const ascii = new Uint8Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) {
        ascii[i] = bytes.charCodeAt(i);
      }
      return ascii;
    };

    const scribbleClip = clip({
      pattern: 'x',
      notes: 'c4',
    });

    const bytesTempo1 = midi(scribbleClip, null, 100) as string;
    const bytesTempo2 = midi(scribbleClip, null, 101) as string;

    // Compare that the two generated midi files have different values
    expect(convertBytesToAsciiArray(bytesTempo1)[27]).toBe(39);
    expect(convertBytesToAsciiArray(bytesTempo2)[27]).toBe(16);
  });
});
