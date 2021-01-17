import { scale } from '../src/scalesAndChords';

describe('../src/scale', () => {
  it('returns correct notes for a scale without being case sensitive', () => {
    expect(scale('C4 major').join()).toBe('C4,D4,E4,F4,G4,A4,B4');
    expect(scale('c4 Major').join()).toBe('C4,D4,E4,F4,G4,A4,B4');
    // TODO: Add support for lydian #5P pentatonic & minor #7M pentatonic
    // expect(scale('c4 lydian #5P pentatonic').join()).toBe('C4,E4,Gb4,Ab4,B4');
    // expect(scale('c4 minor #7M pentatonic').join()).toBe('C4,Eb4,F4,G4,B4');
  });
});
