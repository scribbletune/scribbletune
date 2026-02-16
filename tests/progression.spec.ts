import { describe, expect, it } from 'vitest';
import {
  getChordDegrees,
  getChordsByProgression,
  progression,
} from '../src/progression';
import type { ProgressionScale } from '../src/types';

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

  it('returns correct degrees for melodic minor and harmonic minor modes', () => {
    expect(getChordDegrees('melodic minor').join(',')).toBe(
      'i,ii,III+,IV,V,vi°,vii°'
    );
    expect(getChordDegrees('harmonic minor').join(',')).toBe(
      'i,ii°,III+,iv,V,VI,vii°'
    );
  });

  it('returns empty array for unknown modes', () => {
    expect(getChordDegrees('unknown mode')).toEqual([]);
  });

  it('uses major as ionian alias', () => {
    expect(getChordDegrees('major')).toEqual(getChordDegrees('ionian'));
  });

  it('uses minor as aeolian alias', () => {
    expect(getChordDegrees('minor')).toEqual(getChordDegrees('aeolian'));
  });

  it('generates major chord progressions', () => {
    const prog = progression('major', 4);
    expect(prog).toHaveLength(4);
    expect(prog.every(chord => typeof chord === 'string')).toBe(true);
    expect(
      ['I', 'vi'].some(c => prog[0].toLowerCase().startsWith(c.toLowerCase()))
    ).toBe(true);
  });

  it('generates minor chord progressions', () => {
    const prog = progression('minor', 4);
    expect(prog).toHaveLength(4);
    expect(prog.every(chord => typeof chord === 'string')).toBe(true);
  });

  it('uses M as major alias', () => {
    const progM = progression('M', 4);
    const progMajor = progression('major', 4);
    expect(progM).toHaveLength(progMajor.length);
  });

  it('uses m as minor alias', () => {
    const progm = progression('m', 4);
    const progMinor = progression('minor', 4);
    expect(progm).toHaveLength(progMinor.length);
  });

  it('returns empty array for invalid scale type', () => {
    const prog = progression('unknown' as unknown as ProgressionScale);
    expect(prog).toEqual([]);
  });

  it('uses default count of 4 if not provided', () => {
    const prog = progression('major');
    expect(prog).toHaveLength(4);
  });

  it('generates progressions with custom count', () => {
    const prog2 = progression('major', 2);
    const prog8 = progression('major', 8);
    expect(prog2).toHaveLength(2);
    expect(prog8).toHaveLength(8);
  });

  it('works with chord degrees including special characters', () => {
    expect(getChordsByProgression('C4 major', 'I+ V7')).toBe('CM#5_4 Gmaj7_4');
  });
});
