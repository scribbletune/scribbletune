import * as fs from 'node:fs';
import { scale } from 'harmonics';
import { afterEach, describe, expect, it } from 'vitest';
import { clip } from '../src/clip';
import { midi } from '../src/midi';

describe('../src/midi', () => {
  afterEach(() => {
    // Clean up any generated midi files
    const files = [
      'music.mid',
      'music.mid.mid',
      'test.mid',
      'test.mid.mid',
      'custom_name.mid',
    ];
    files.forEach(file => {
      if (fs.existsSync(`./${file}`)) {
        fs.unlinkSync(`./${file}`);
      }
    });
  });

  it('writes a midi file', () => {
    const fileName = 'music.mid';
    const filePath = `./${fileName}`;
    const scribbleClip = clip({
      pattern: 'x[-x]',
      notes: scale('C4 major') as string | (string | string[])[],
    });

    midi(scribbleClip, fileName);
    expect(fs.existsSync(filePath)).toBe(true);
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

  it('adds .mid extension if not provided', () => {
    const fileName = 'test';
    const filePath = './test.mid';
    const scribbleClip = clip({
      pattern: 'x',
      notes: 'C4',
    });

    midi(scribbleClip, fileName);
    expect(fs.existsSync(filePath)).toBe(true);
    fs.unlinkSync(filePath);
  });

  it('returns bytes if fileName is null', () => {
    const scribbleClip = clip({
      pattern: 'x',
      notes: 'C4',
    });
    const result = midi(scribbleClip, null);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('handles clips with multiple notes (chords)', () => {
    const scribbleClip = clip({
      pattern: 'x',
      notes: 'CM',
    });

    const result = midi(scribbleClip, null);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('handles empty clip pattern', () => {
    const scribbleClip = clip({
      pattern: 'x[-]',
      notes: 'C4',
    });

    const result = midi(scribbleClip, null);
    expect(result).toBeDefined();
  });
});
