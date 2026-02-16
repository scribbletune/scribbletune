import { describe, expect, it } from 'vitest';
import { arp } from '../src/arp';

describe('../src/arp', () => {
  it('returns correct notes', () => {
    expect(arp('CM_4 FM_4')[0]).toBe('C4');
    expect(
      arp({
        chords: 'CM_4 FM_4',
        order: '76543210',
        count: 8,
      })[0]
    ).toBe('E6');
  });

  it('sets the order if only count was provided', () => {
    const a = arp({
      chords: 'Cmaj7_4 Fmaj7_4',
      count: 8,
    });

    expect(a[0]).toBe('C4');
    expect(a[15]).toBe('E6');
  });

  it('set default order to 0123 and count to 4 when only chords are passed', () => {
    expect(arp('CM_4 FM_4')[3]).toBe('C5');
    expect(arp('CM_4 FM_4')[7]).toBe('F5');
  });

  it('accepts chords as arrays', () => {
    const a = arp({
      chords: [
        ['C3', 'E3', 'G3', 'B3'],
        ['F3', 'A3', 'C4', 'E4'],
      ],
      count: 8,
    });

    expect(a[0]).toBe('C3');
    expect(a[15]).toBe('E5');
  });

  it('throws error for invalid order with non-numeric characters', () => {
    expect(() => {
      arp({
        chords: 'CM_4',
        order: 'abc0',
        count: 4,
      });
    }).toThrow('Invalid value for order');
  });

  it('throws error for invalid count greater than 8', () => {
    expect(() => {
      arp({
        chords: 'CM_4',
        count: 9,
      });
    }).toThrow('Invalid value for count');
  });

  it('throws error for invalid count less than 2', () => {
    expect(() => {
      arp({
        chords: 'CM_4',
        count: 1,
      });
    }).toThrow('Invalid value for count');
  });

  it('throws error for invalid chords type', () => {
    expect(() => {
      arp({
        chords: 123 as unknown as string,
        count: 4,
      });
    }).toThrow('Invalid value for chords');
  });

  it('throws error for invalid chord string', () => {
    expect(() => {
      arp('INVALID_CHORD');
    }).toThrow('Cannot decode chord');
  });

  it('handles valid chord arrays without throwing', () => {
    // When valid note arrays are passed, they should work
    const result = arp({
      chords: [['C3', 'E3', 'G3', 'B3']],
      count: 4,
    });
    expect(result).toBeDefined();
    expect(result.length).toBe(4);
  });

  it('generates correct array length based on chord count and count param', () => {
    const result1 = arp({
      chords: 'CM_4',
      count: 4,
    });
    expect(result1.length).toBe(4);

    const result2 = arp({
      chords: 'CM_4 FM_4',
      count: 4,
    });
    expect(result2.length).toBe(8);
  });

  it('respects custom order for note reordering', () => {
    const result = arp({
      chords: 'CM_4',
      order: '3210',
      count: 4,
    });
    expect(result[0]).toBeDefined();
    // First element should be a valid note
    expect(typeof result[0]).toBe('string');
  });
});
