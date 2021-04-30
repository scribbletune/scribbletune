import { getChordsByProgression, getChordDegrees } from '../src/progression';

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
    expect(getChordsByProgression('C4 major', 'I7 ii7')).toBe('Cmaj7_4 Dm7_4');
    expect(getChordsByProgression('C4 major', 'I ii° VI°')).toBe(
      'CM_4 Dm7b5_4 AM7b5_4'
    );
  });

  it('returns correct degrees for provided modes', () => {
    expect(getChordDegrees('ionian').join(',')).toBe('I,ii,iii,IV,V,vi,vii°');
    expect(getChordDegrees('dorian').join(',')).toBe('i,ii,III,IV,v,vi°,VII');
    expect(getChordDegrees('phrygian').join(',')).toBe('i,II,III,iv,v°,VI,vii');
    expect(getChordDegrees('lydian').join(',')).toBe('I,II,iii,iv°,V,vi,vii');
    expect(getChordDegrees('mixolydian').join(',')).toBe(
      'I,ii,iii°,IV,v,vi,VII'
    );
    expect(getChordDegrees('aeolian').join(',')).toBe('i,ii°,III,iv,v,VI,VII');
    expect(getChordDegrees('locrian').join(',')).toBe('i°,II,iii,iv,V,VI,vii');
  });
});
