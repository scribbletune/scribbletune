import { getChordsByProgression } from '../src/progression';

describe('../src/progression', () => {
  it('gets correct chords for a given progression', () => {
    expect(getChordsByProgression('C4 major', 'I IV V ii')).toBe(
      'CM_4 FM_4 GM_4 Dm_4'
    );
    expect(getChordsByProgression('D4 minor', 'I IV V ii')).toBe(
      'DM_4 GM_4 AM_4 Em_4'
    );
    expect(getChordsByProgression('D minor', 'I IV V ii')).toBe(
      'DM_4 GM_4 AM_4 Em_4'
    );
    expect(getChordsByProgression('C4 major', 'I7 ii7')).toBe('CMaj7_4 Dm7_4');
    expect(getChordsByProgression('C4 major', 'I ii° VI°')).toBe(
      'CM_4 Dm7b5_4 AM7b5_4'
    );
  });
});
