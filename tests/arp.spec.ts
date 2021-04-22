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
});
