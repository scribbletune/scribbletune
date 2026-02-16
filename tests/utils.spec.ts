import { describe, expect, it } from 'vitest';
import {
  convertChordsToNotes,
  convertChordToNotes,
  dice,
  errorHasMessage,
  expandStr,
  isNote,
  pickOne,
  randomInt,
  shuffle,
} from '../src/utils';

describe('../src/utils', () => {
  it('expands as expected', () => {
    expect(expandStr('x')[0]).toBe('x');
    expect(expandStr('xx')[1]).toBe('x');
    expect(expandStr('x[-x]')[1][0]).toBe('-');
    expect(expandStr('x[-x[-x]]')[1][2][1]).toBe('x');
  });

  it('is able to recognize a valid note', () => {
    expect(isNote('Fg')).toBe(false);
    expect(isNote('j')).toBe(false);
    expect(isNote('CM')).toBe(false);
    expect(isNote('C4th')).toBe(false);
    expect(isNote('F4')).toBe(true);
    expect(isNote('db3')).toBe(true);
    expect(isNote('C#5')).toBe(true);
    expect(isNote('Bb2')).toBe(true);
  });

  it('shuffles arrays with fullShuffle enabled', () => {
    const arr = ['a', 'b', 'c', 'd'];
    const original = [...arr];
    shuffle(arr, true);
    // At least one element should have moved
    let hasMoved = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== original[i]) {
        hasMoved = true;
        break;
      }
    }
    expect(hasMoved).toBe(true);
  });

  it('shuffles arrays with fullShuffle disabled', () => {
    const arr = ['a', 'b', 'c', 'd'];
    shuffle(arr, false);
    // Should still contain all original elements
    expect(arr.sort()).toEqual(['a', 'b', 'c', 'd'].sort());
  });

  it('pickOne returns single element from array with one item', () => {
    expect(pickOne(['only'])).toBe('only');
  });

  it('pickOne returns one of the elements from multi-item array', () => {
    const arr = ['a', 'b', 'c'];
    const result = pickOne(arr);
    expect(arr).toContain(result);
  });

  it('dice returns a boolean', () => {
    const result = dice();
    expect(typeof result).toBe('boolean');
  });

  it('errorHasMessage identifies error-like objects', () => {
    expect(errorHasMessage({ message: 'error' })).toBe(true);
    expect(errorHasMessage(new Error('test'))).toBe(true);
    expect(errorHasMessage({ data: 'not error' })).toBe(false);
    expect(errorHasMessage({ message: 123 })).toBe(false);
  });

  it('convertChordToNotes converts inline chord notation', () => {
    expect(convertChordToNotes('CM').length).toBeGreaterThan(0);
    expect(convertChordToNotes('Dm7').length).toBeGreaterThan(0);
  });

  it('convertChordToNotes converts chord notation with underscore', () => {
    const notes = convertChordToNotes('CM_4');
    expect(notes.length).toBeGreaterThan(0);
  });

  it('convertChordsToNotes handles single note strings', () => {
    const result = convertChordsToNotes('C4');
    expect(result).toEqual(['C4']);
  });

  it('convertChordsToNotes handles arrays of notes', () => {
    const result = convertChordsToNotes(['C4', 'E4', 'G4']);
    expect(result).toEqual(['C4', 'E4', 'G4']);
  });

  it('convertChordsToNotes handles chord strings', () => {
    const result = convertChordsToNotes('CM_4');
    expect(result.length).toBeGreaterThan(0);
  });

  it('convertChordsToNotes throws error for invalid notes in array', () => {
    expect(() => {
      convertChordsToNotes(['C4', 'INVALID']);
    }).toThrow('array must comprise valid notes');
  });

  it('convertChordsToNotes throws error for array of arrays with invalid notes', () => {
    expect(() => {
      convertChordsToNotes([['C4', 'INVALID']]);
    }).toThrow('array of arrays must comprise valid notes');
  });

  it('convertChordsToNotes validates all nested arrays', () => {
    const result = convertChordsToNotes([['C4', 'E4', 'G4']]);
    expect(result).toBeDefined();
  });

  it('randomInt returns number between 0 and given number', () => {
    for (let i = 0; i < 10; i++) {
      const result = randomInt(100);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    }
  });

  it('randomInt returns 0 or 1 for default argument', () => {
    for (let i = 0; i < 10; i++) {
      const result = randomInt();
      expect([0, 1]).toContain(result);
    }
  });
});
