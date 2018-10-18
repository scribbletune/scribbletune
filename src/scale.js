'use strict';

const Tonal = require('tonal');

const getScaleNotes = (tonicOctScale) => {
  const tokenizedName = Tonal.Scale.tokenize(tonicOctScale);
  const scaleName = tokenizedName[1] || tokenizedName;
  if (!Tonal.Scale.exists(scaleName)) {
    throw new TypeError('Invalid scale name: ' + scaleName, 'scale.js', 9);
  }
  return Tonal.Scale.notes(tonicOctScale).map(el => Tonal.Note.fromMidi(Tonal.Note.midi(el)));
};

const getAvailableScaleNames = () => {
  return Tonal.Scale.names();
};

module.exports = {getScaleNotes, getAvailableScaleNames};
