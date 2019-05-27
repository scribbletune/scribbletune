import * as Tonal from 'tonal';

export const getScale = (tonicOctScale: string): (null | string)[] => {
  tonicOctScale = tonicOctScale && tonicOctScale.toLowerCase();

  // In Tonal, the only scales that are not entirely lower case are
  // lydian #5P pentatonic and minor #7M pentatonic,
  // hence make provision for them separately
  tonicOctScale = tonicOctScale.replace('#5p', '#5P');
  tonicOctScale = tonicOctScale.replace('#7m', '#7M');

  const tokenizedName: [string, string] = Tonal.Scale.tokenize(tonicOctScale);
  const scaleName: string = tokenizedName[1];

  if (!Tonal.Scale.exists(scaleName)) {
    throw new Error(`${tonicOctScale} does not exist!`);
  }

  return Tonal.Scale.notes(tonicOctScale).map(Tonal.Note.simplify);
};

export const scales = (): string[] => {
  return Tonal.Scale.names();
};
