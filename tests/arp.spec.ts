import { arp } from '../src/arp';

describe('../src/arp', () => {
  it('returns correct notes', () => {
    expect(arp('CM-4 FM-4')[0]).toBe('C4');
    expect(
      arp({
        chords: 'CM-4 FM-4',
        order: '76543210',
        count: 8,
      })[0]
    ).toBe('E6');
  });

  it('sets the order if only count was provided', () => {
    const a = arp({
      chords: 'CM7-4 FM7-4',
      count: 8,
    });

    expect(a[0]).toBe('C4');
    expect(a[15]).toBe('E6');
  });

  it('set default order to 0123 and count to 4 when only chords are passed', () => {
    expect(arp('CM-4 FM-4')[3]).toBe('C5');
    expect(arp('CM-4 FM-4')[7]).toBe('F5');
  });
});
