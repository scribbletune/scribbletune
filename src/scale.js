'use strict';

const Tonal = require('tonal');

const getScaleNotes = (tonicOctScale) => {
  tonicOctScale = tonicOctScale && tonicOctScale.toLowerCase(); // tonal expects lower case scale names
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
