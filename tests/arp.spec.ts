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
});
