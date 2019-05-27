import { getChords } from '../src/progression';

describe('../src/progression', () => {
  it('gets correct chords for a given progression', () => {
    expect(getChords('C4 major', 'I IV V ii')).toBe('CM-4 FM-4 GM-4 Dm-4');
    expect(getChords('D4 minor', 'I IV V ii')).toBe('DM-4 GM-4 AM-4 Em-4');
    expect(getChords('D minor', 'I IV V ii')).toBe('DM-4 GM-4 AM-4 Em-4');
    expect(getChords('C4 major', 'I7 ii7')).toBe('CMaj7-4 Dm7-4');
    expect(getChords('C4 major', 'I ii° VI°')).toBe('CM-4 Dm7b5-4 AM7b5-4');
  });
});
