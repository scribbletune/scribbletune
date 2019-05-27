import { getChord, chords } from '../src/chord';

describe('../src/chord', () => {
  it('identifies numerical chords with a suffix of `th`', () => {
    const c4th = getChord('C4th');
    expect(c4th![0]).toBe('C4');
    expect(c4th![1]).toBe('F4');
    expect(c4th![2]).toBe('Bb4');
    expect(c4th![3]).toBe('Eb5');
  });

  it('identifies numerical chords with a suffix of `th` & octave', () => {
    const d4th = getChord('D4th-5');
    expect(d4th![0]).toBe('D5');
    expect(d4th![1]).toBe('G5');
    expect(d4th![2]).toBe('C6');
    expect(d4th![3]).toBe('F6');
  });

  it('returns numerical chords with a suffix of `th`', () => {
    const allChords = chords();
    expect(allChords.includes('5')).toBe(false);
    expect(allChords.includes('5th')).toBe(true);
    expect(allChords.indexOf('4')).toBe(-1);
    expect(allChords.includes('4th')).toBe(true);
    expect(allChords.indexOf('11')).toBe(-1);
    expect(allChords.includes('11th')).toBe(true);
    expect(allChords.indexOf('13')).toBe(-1);
    expect(allChords.includes('13th')).toBe(true);
  });

  it('returns simplified notes with the correct octave', () => {
    expect(getChord('CM')!.join()).toBe('C4,E4,G4');
    expect(getChord('CM-5')!.join()).toBe('C5,E5,G5');
    expect(getChord('Gbm')!.join()).toBe('Gb4,A4,Db5');
  });
});
