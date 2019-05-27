// global.window = true;

import { clip } from '../src/clip';
import { getScale } from '../src/scale';

describe('../src/clip', () => {
  it('allows lowercase notes', () => {
    expect(
      clip({
        notes: ['d3'],
        pattern: 'x',
      })[0].note[0]
    ).toBe('d3');
  });

  it('allows uppercase notes', () => {
    expect(
      clip({
        notes: 'D3',
        pattern: 'x',
      })[0].note[0]
    ).toBe('D3');
  });

  it('throws an error in case of invalid notes', () => {
    expect(function() {
      clip({ notes: ['k1'], pattern: 'x' });
    }).toThrow();
  });

  it('throws an error in case of invalid pattern', () => {
    expect(function() {
      clip({ notes: ['C4'], pattern: 'jjdk' });
    }).toThrow();
  });

  it('accepts a string of notes', () => {
    const c = clip({
      notes: 'C4 D4 E4',
      pattern: 'xxx',
    });
    expect(c[0].note[0]).toBe('C4');
    expect(c[1].note[0]).toBe('D4');
    expect(c[2].note[0]).toBe('E4');
  });

  it('accepts a string of notes with chords', () => {
    const c = clip({
      notes: 'C4 DM E4',
      pattern: 'xxx',
    });
    expect(c[0].note[0]).toBe('C4');
    expect(c[1].note[0]).toBe('D4');
    expect(c[1].note[1]).toBe('F#4');
    expect(c[1].note[2]).toBe('A4');
    expect(c[2].note[0]).toBe('E4');
  });

  it('accepts a string of notes with chords with octaves', () => {
    const c = clip({
      notes: 'C4 DM-5 E4',
      pattern: 'xxx',
    });
    expect(c[0].note[0]).toBe('C4');
    expect(c[1].note[0]).toBe('D5');
    expect(c[1].note[1]).toBe('F#5');
    expect(c[1].note[2]).toBe('A5');
    expect(c[2].note[0]).toBe('E4');
  });

  it('shuffles notes', () => {
    const c = clip({
      notes: getScale('C3 major') as string | (string | string[])[],
      pattern: 'xxxx',
      shuffle: true,
    });
    expect(c[0].note[0] === 'C3' && c[0].note[0] === 'D3').toBe(false);
  });

  it('extends notes in case of a longer pattern', () => {
    let longerPattern = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    const c = clip({
      notes: ['c3', 'd3'],
      pattern: longerPattern,
    });
    expect(c.length).toBe(longerPattern.length);
  });

  it('extends notes in case of a longer pattern but retains length of pattern', () => {
    const c = clip({
      notes: ['c3'],
      pattern: 'xxxxx',
    });
    expect(c.length).toBe(5);
  });

  it('accepts chords', () => {
    const c = clip({
      notes: ['CM', 'Cm', 'A3'],
      pattern: 'xxx',
    });
    expect(c[0].note.join()).toBe('C4,E4,G4');
    expect(c[1].note.join()).toBe('C4,Eb4,G4');
    expect(c[2].note.join()).toBe('A3');
  });

  it.skip('accepts arrays of notes as individual notes', () => {
    const c = clip({
      notes: [['c4', 'e4', 'g4']],
      pattern: 'x',
    });
    expect(c[0].note.join()).toBe('c4,e4,g4');
  });

  it.skip('accepts arrays of notes with individual notes', () => {
    const c = clip({
      notes: [['c4', 'e4', 'g4'], 'e3'],
      pattern: 'xx',
    });
    expect(c[0].note.join()).toBe('c4,e4,g4');
    expect(c[1].note.join()).toBe('e3');
  });

  it.skip('throws an error for invalid notes', () => {
    expect(
      clip({
        notes: [['m', 'p', 'true']],
        pattern: 'xx',
      })
    ).toThrow();
  });

  it('accepts tidal format for patterns', () => {
    const c = clip({
      notes: 'c4',
      pattern: 'x[-x]x[x[xx]]',
    });
    expect(c[0].length).toBe(128);
    expect(c[2].length).toBe(64);
    expect(c[6].length).toBe(32);
  });

  it('accepts tidal format with underscores', () => {
    const c = clip({
      notes: 'c4',
      pattern: 'x___',
    });
    expect(c[0].length).toBe(512);
  });
});
