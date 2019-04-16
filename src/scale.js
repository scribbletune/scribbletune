'use strict';

const Tonal = require('tonal');

const getScaleNotes = (tonicOctScale) => {
  tonicOctScale = tonicOctScale && tonicOctScale.toLowerCase();

  // In Tonal, the only scales that are not entirely lower case are
  // lydian #5P pentatonic and minor #7M pentatonic,
  // hence make provision for them separately
  tonicOctScale = tonicOctScale.replace('#5p', '#5P');
  tonicOctScale = tonicOctScale.replace('#7m', '#7M');

  const tokenizedName = Tonal.Scale.tokenize(tonicOctScale);
  const scaleName = tokenizedName[1] || tokenizedName;
  if (!Tonal.Scale.exists(scaleName)) {
    throw new TypeError('Invalid scale name: ' + scaleName);
  }
  return Tonal.Scale.notes(tonicOctScale).map(Tonal.Note.simplify);
};

const getAvailableScaleNames = () => {
  return Tonal.Scale.names();
};

module.exports = {getScaleNotes, getAvailableScaleNames};
