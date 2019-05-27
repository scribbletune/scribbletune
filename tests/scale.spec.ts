import { getScale } from '../src/scale';

describe('../src/scale', () => {
  it('returns correct notes from tonal without beng case sensitive', () => {
    expect(getScale('C4 major').join()).toBe('C4,D4,E4,F4,G4,A4,B4');
    expect(getScale('c4 Major').join()).toBe('C4,D4,E4,F4,G4,A4,B4');
    expect(getScale('c4 lydian #5P pentatonic').join()).toBe(
      'C4,E4,F#4,G#4,B4'
    );
    expect(getScale('c4 minor #7M pentatonic').join()).toBe('C4,Eb4,F4,G4,B4');
  });
});
