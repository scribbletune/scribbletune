// global.window = true;

import { clip } from '../src/clip';
import { scale } from 'harmonics';

describe('../src/clip', () => {
  it('allows lowercase notes', () => {
    expect(
      clip({
        notes: ['D3'],
        pattern: 'x',
      })[0].note[0]
    ).toBe('D3');
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
    expect(function () {
      clip({ notes: ['k1'], pattern: 'x' });
    }).toThrow();
  });

  it('throws an error in case of invalid pattern', () => {
    expect(function () {
      clip({ notes: ['C4'], pattern: 'jjdk' });
    }).toThrow();
  });

  it('accepts R to denote a note to be added randomly', () => {
    expect(function () {
      clip({ notes: ['C4'], pattern: 'xxRx' });
    }).not.toThrow();
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
    expect(c[1].note[1]).toBe('Gb4');
    expect(c[1].note[2]).toBe('A4');
    expect(c[2].note[0]).toBe('E4');
  });

  it('accepts a string of notes with chords with octaves', () => {
    const c = clip({
      notes: 'C4 DM_5 E4',
      pattern: 'xxx',
    });
    expect(c[0].note[0]).toBe('C4');
    expect(c[1].note[0]).toBe('D5');
    expect(c[1].note[1]).toBe('Gb5');
    expect(c[1].note[2]).toBe('A5');
    expect(c[2].note[0]).toBe('E4');
  });

  it('shuffles notes', () => {
    const c = clip({
      notes: scale('C3 major') as string | (string | string[])[],
      pattern: 'xxxx',
      shuffle: true,
    });
    expect(c[0].note[0] === 'C3' && c[1].note[0] === 'D3').toBe(false);
  });

  it('extends notes in case of a longer pattern', () => {
    const longerPattern = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    const c = clip({
      notes: ['C3', 'D3'],
      pattern: longerPattern,
    });
    expect(c.length).toBe(longerPattern.length);
  });

  it('extends notes in case of a longer pattern but retains length of pattern', () => {
    const c = clip({
      notes: ['C3'],
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
      notes: [['C4', 'E4', 'G4'], 'E3'],
      pattern: 'xx',
    });
    expect(c[0].note.join()).toBe('C4,E4,G4');
    expect(c[1].note.join()).toBe('E3');
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
      notes: 'C4',
      pattern: 'x[-x]x[x[xx]]',
    });
    expect(c[0].length).toBe(128);
    expect(c[2].length).toBe(64);
    expect(c[6].length).toBe(32);
  });

  it('accepts tidal format with underscores', () => {
    const c = clip({
      notes: 'C4',
      pattern: 'x___',
    });
    expect(c[0].length).toBe(512);
  });

  it('applies sin styled sizzle if true', () => {
    const c = clip({
      notes: 'C4',
      pattern: 'xxxx',
      sizzle: true,
    });
    expect(c[0].level).toBe(1);
    expect(c[1].level).toBe(71);
    expect(c[2].level).toBe(100);
    expect(c[3].level).toBe(71);
  });

  it('applies sin styled sizzle if sin is specified', () => {
    const c = clip({
      notes: 'C4',
      pattern: 'x'.repeat(16),
      sizzle: 'sin',
    });
    expect(c[0].level).toBe(1);
    expect(c[1].level).toBe(20);
    expect(c[2].level).toBe(38);
    expect(c[3].level).toBe(56);
  });

  it('repeats a sin styled sizzle if sin is specified with reps', () => {
    const c = clip({
      notes: 'C4',
      pattern: 'x'.repeat(16),
      sizzle: 'sin',
      sizzleReps: 4,
    });
    expect(c[0].level).toBe(1);
    expect(c[1].level).toBe(71);
    expect(c[2].level).toBe(100);
    expect(c[3].level).toBe(71);
  });

  it('applies cos styled sizzle if cos is specified', () => {
    const c = clip({
      notes: 'C4',
      pattern: 'x'.repeat(16),
      sizzle: 'cos',
    });
    expect(c[0].level).toBe(100);
    expect(c[1].level).toBe(98);
    expect(c[2].level).toBe(92);
    expect(c[3].level).toBe(83);
  });

  it('applies rampUp styled sizzle if rampUp is specified', () => {
    const c = clip({
      notes: 'C4',
      pattern: 'x'.repeat(16),
      sizzle: 'rampUp',
    });
    const volArr = c.map((c: any) => c.level);
    expect(volArr.join(',')).toBe(
      '1,6,13,19,25,31,38,44,50,56,63,69,75,81,88,94'
    );
  });

  it('applies rampUp styled sizzle if rampUp is specified', () => {
    const c = clip({
      notes: 'C4',
      pattern: 'x'.repeat(16),
      sizzle: 'rampDown',
    });
    const volArr = c.map((c: any) => c.level);
    expect(volArr.join(',')).toBe(
      '100,94,88,81,75,69,63,56,50,44,38,31,25,19,13,6'
    );
  });

  it('adjusts sizzle according to custome amplitude', () => {
    const c = clip({
      notes: 'C4',
      pattern: 'x'.repeat(16),
      sizzle: 'rampDown',
      amp: 127,
    });
    const volArr = c.map((c: any) => c.level);
    expect(volArr.join(',')).toBe(
      '127,119,111,103,95,87,79,71,64,56,48,40,32,24,16,8'
    );
  });

  it('accepts an accent to affect volumes in a clip', () => {
    const c = clip({
      notes: 'C4',
      pattern: 'xxxx',
      accent: 'x--x',
    });
    const volArr = c.map((c: any) => c.level);
    expect(volArr.join(',')).toBe('100,70,70,100');
  });

  it('allows accent volumes to be affected by a custom amplitude', () => {
    const c = clip({
      notes: 'C4',
      pattern: 'xxxx',
      accent: 'x--x',
      amp: 127,
    });
    const volArr = c.map((c: any) => c.level);
    expect(volArr.join(',')).toBe('127,70,70,127');
  });

  it('allows accent volumes to be affected by a custom lower accent', () => {
    const c = clip({
      notes: 'C4',
      pattern: 'xxxx',
      accent: 'x--x',
      amp: 127,
      accentLow: 23,
    });
    const volArr = c.map((c: any) => c.level);
    expect(volArr.join(',')).toBe('127,23,23,127');
  });

  it('extends accents according to clip length', () => {
    const c = clip({
      notes: 'C4',
      pattern: 'xxxxx',
      accent: 'x--x',
      amp: 127,
      accentLow: 23,
    });
    const volArr = c.map((c: any) => c.level);
    expect(volArr.join(',')).toBe('127,23,23,127,127');
  });

  it('throws an error in case of invalid accent', () => {
    expect(function () {
      clip({ notes: 'C4', pattern: 'x', accent: 'k' });
    }).toThrow();
    expect(function () {
      clip({ notes: 'C4', pattern: 'x', accent: 'x_' });
    }).toThrow();
  });

  it('sets an average of accent and sizzle if both are provided', () => {
    const c = clip({
      notes: 'C4',
      pattern: 'xxxx',
      accent: 'x--x',
      sizzle: true,
    });
    const volArr = c.map((c: any) => c.level);
    expect(volArr.join(',')).toBe('51,71,85,86');
  });

  it('accepts array of arrays', () => {
    expect(function () {
      clip({
        notes: [
          ['c4', 'e4'],
          ['e4'],
          ['c4', 'e4'],
          ['e4'],
          ['d4', 'e4'],
          ['e4'],
          ['c4', 'e4'],
          ['d4', 'f4'],
          ['e4'],
          ['e4'],
          ['c4', 'e4'],
          ['d4', 'e4'],
          ['d4', 'e4'],
          ['c4', 'f4'],
          ['e4'],
          ['c4', 'd4', 'e4'],
        ],
        pattern: 'xxxx',
      });
    }).not.toThrow();
  });

  it('accepts array of arrays but throws an error for incorrect input', () => {
    expect(function () {
      clip({
        notes: [['c4', 'e4'], ['k4']],
        pattern: 'xxxx',
      });
    }).toThrow();
  });

  it('sets quarter note as the default subdivision', () => {
    const c = clip({
      notes: 'C4',
      pattern: 'x',
    });
    expect(c[0].length).toBe(128);
  });

  it('allows setting eighth note as the subdivision', () => {
    const c = clip({
      notes: 'C4',
      pattern: 'x',
      subdiv: '8n',
    });
    expect(c[0].length).toBe(64);
  });

  it('allows setting a whole note as the subdivision', () => {
    const c = clip({
      notes: 'C4',
      pattern: 'x',
      subdiv: '1n',
    });
    expect(c[0].length).toBe(512);
  });

  it('allows setting an entire measure as the subdivision', () => {
    const c = clip({
      notes: 'C4',
      pattern: 'x',
      subdiv: '1m',
    });
    expect(c[0].length).toBe(2048);
  });

  it('sets note to null in case of hyphen in the pattern', () => {
    const c = clip({
      notes: 'C4 D4 E4',
      pattern: 'x-x_',
    });
    expect(c[0].note[0]).toBe('C4');
    expect(c[1].note).toBe(null);
    expect(c[2].note[0]).toBe('D4');
  });

  it('sets note to null in case of hyphen in a nested pattern', () => {
    const c = clip({
      notes: 'C4 D4 E4',
      pattern: 'x-x[x-]',
    });
    expect(c[0].note[0]).toBe('C4');
    expect(c[1].note).toBe(null);
    expect(c[2].note[0]).toBe('D4');
    expect(c[4].note).toBe(null);
  });

  it('sets note length appropriately for a nested pattern', () => {
    const c = clip({
      notes: 'C4 D4 E4',
      pattern: 'x-x[x-]',
    });
    expect(c[0].length).toBe(128);
    expect(c[1].length).toBe(128);
    expect(c[2].length).toBe(128);
    expect(c[3].length).toBe(64);
    expect(c[4].length).toBe(64);
  });

  it('sets note & note length appropriately for a nested pattern and custom subdiv', () => {
    const c = clip({
      notes: 'C4 D4 E4',
      pattern: 'x-x[x-[x-]x]',
      subdiv: '8n',
    });
    expect(c[0].length).toBe(64);
    expect(c[1].length).toBe(64);
    expect(c[2].length).toBe(64);
    expect(c[3].length).toBe(16);
    expect(c[4].length).toBe(16);
    expect(c[4].note).toBe(null);
    expect(c[5].length).toBe(8);
    expect(c[6].length).toBe(8);
    expect(c[6].note).toBe(null);
    expect(c[7].length).toBe(16);
  });

  it('bumps note length for underscores in the pattern', () => {
    const c = clip({
      notes: 'C4 D4 E4',
      pattern: 'xxx_',
    });
    expect(c[1].length).toBe(128);
    expect(c[2].length).toBe(256);
  });

  it('bumps note length for underscores in a nested pattern', () => {
    const c = clip({
      notes: 'C4 D4 E4',
      pattern: 'x_[x_][x[x_]]',
    });
    expect(c[0].length).toBe(256);
    expect(c[1].length).toBe(128);
    expect(c[2].length).toBe(64);
  });

  it('accepts triplets and sets note lengths accordingly', () => {
    const c = clip({
      notes: 'C4',
      pattern: '[xxx]',
    });
    expect(c[0].length).toBe(43);
    expect(c[1].length).toBe(43);
    expect(c[2].length).toBe(42);
  });
  it('accepts triplets in nested patterns and sets note lengths accordingly', () => {
    const c = clip({
      notes: 'C4',
      pattern: '[xx[xx]]',
    });
    expect(c[0].length).toBe(43);
    expect(c[1].length).toBe(43);
    expect(c[2].length).toBe(22);
    expect(c[3].length).toBe(21);
  });

  it('accepts triplets in between nested patterns and sets note lengths accordingly', () => {
    const c = clip({
      notes: 'C4',
      pattern: '[x[xx]x]',
    });
    expect(c[0].length).toBe(43);
    expect(c[1].length).toBe(22);
    expect(c[2].length).toBe(21);
    expect(c[3].length).toBe(42);
  });

  it('accepts triplets in complexly nested patterns and sets note lengths accordingly', () => {
    const c = clip({
      notes: 'C4',
      pattern: 'x[x[xx]x]x_x-x-[x_[xxx]]',
    });
    expect(c[0].length).toBe(128);
    expect(c[1].length).toBe(43);
    expect(c[2].length).toBe(22);
    expect(c[3].length).toBe(21);
    expect(c[4].length).toBe(42);
    expect(c[5].length).toBe(256);
    expect(c[6].length).toBe(128);
    expect(c[7].length).toBe(128);
    expect(c[8].length).toBe(128);
    expect(c[7].note).toBe(null);
    expect(c[9].length).toBe(128);
    expect(c[9].note).toBe(null);
    expect(c[10].length).toBe(86);
    expect(c[11].length).toBe(14);
    expect(c[12].length).toBe(14);
    expect(c[13].length).toBe(13);
  });
});
