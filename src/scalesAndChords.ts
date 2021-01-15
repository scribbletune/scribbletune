import { Util } from 'jsmidgen';

export const scaleMaps: NVP<string> = {
  major: 'WWHWWW',
  minor: 'WHWWHW',
  'major pentatonic': 'WWAW',
  'ionian pentatonic': 'HHWH',
  'mixolydian pentatonic': 'HHWA',
  ritusen: 'WAWW',
  egyptian: 'WAWA',
  'neopolitan major pentatonic': 'HHHH',
  'vietnamese 1': 'AWWH',
  pelog: 'HWHH',
  kumoijoshi: 'HHWH',
  hirajoshi: 'WHHH',
  iwato: 'HHHH',
  'in-sen': 'HHWA',
  'lydian pentatonic': 'HWHH',
  'malkos raga': 'AWAW',
  'locrian pentatonic': 'AWHH',
  'minor pentatonic': 'AWWA',
  'minor six pentatonic': 'AWWW',
  'flat three pentatonic': 'WHHW',
  'flat six pentatonic': 'WWAH',
  scriabin: 'HAAW',
  'whole tone pentatonic': 'HWWW',
  'lydian #5P pentatonic': 'HWWA',
  'lydian dominant pentatonic': 'HWHA',
  'minor #7M pentatonic': 'AWWH',
  'super locrian pentatonic': 'AHWH',
  'minor hexatonic': 'WHWWH',
  augmented: 'AHAHA',
  'major blues': 'WHHAW',
  piongio: 'WAWWH',
  'prometheus neopolitan': 'HAWAH',
  prometheus: 'WWWAH',
  'mystery #1': 'HAWWW',
  'six tone symmetric': 'HAHAH',
  'whole tone': 'WWWWW',
  "messiaen's mode #5": 'HHHHH',
  'minor blues': 'AWHHA',
  'locrian major': 'WWHHWW',
  'double harmonic lydian': 'HAWHHA',
  'harmonic minor': 'WHWWHA',
  altered: 'HWHWWW',
  'locrian #2': 'WHWHWW',
  'mixolydian b6': 'WWHWHW',
  'lydian dominant': 'WWWHWH',
  lydian: 'WWWHWW',
  'lydian augmented': 'WWWWHW',
  'dorian b2': 'HWWWWH',
  'melodic minor': 'WHWWWW',
  locrian: 'HWWHWW',
  ultralocrian: 'HWHWWH',
  'locrian 6': 'HWWHAH',
  'augmented heptatonic': 'AHHWHA',
  'romanian minor': 'WHAHWH',
  'dorian #4': 'WHAHWH',
  'lydian diminished': 'WHAHWW',
  phrygian: 'HWWWHW',
  'leading whole tone': 'WWWWWH',
  'lydian minor': 'WWWHHW',
  'phrygian dominant': 'HAHWHW',
  balinese: 'HWWWHA',
  'neopolitan major': 'HWWWWW',
  aeolian: 'WHWWHW',
  'harmonic major': 'WWHWHA',
  'double harmonic major': 'HAHWHA',
  dorian: 'WHWWWH',
  'hungarian minor': 'WHAHHA',
  'hungarian major': 'AHWHWH',
  oriental: 'HAHHAH',
  flamenco: 'HWHWHA',
  'todi raga': 'HWAHHA',
  mixolydian: 'WWHWWH',
  persian: 'HAHHWA',
  enigmatic: 'HAWWWH',
  'major augmented': 'WWHAHW',
  'lydian #9': 'AHWHWW',
  "messiaen's mode #4": 'HHAHHHA',
  'purvi raga': 'HAHHHHA',
  'spanish heptatonic': 'HWHHWHW',
  bebop: 'WWHWWHH',
  'bebop minor': 'WHHHWWH',
  'bebop major': 'WWHWHHW',
  'bebop locrian': 'HWWHHHW',
  'minor bebop': 'WHWWHWH',
  diminished: 'WHWHWHW',
  ichikosucho: 'WWHHHWW',
  'minor six diminished': 'WHWWHHW',
  'half-whole diminished': 'HWHWHWH',
  'kafi raga': 'AHHWWHH',
  "messiaen's mode #6": 'WWHHWWH',
  'composite blues': 'WHHHHHWH',
  "messiaen's mode #3": 'WHHWHHWH',
  "messiaen's mode #7": 'HHHWHHHHW',
  chromatic: 'HHHHHHHHHHH',
};

/**
 * Get a list of scales available in Scribbletune.
 * @return {Array}     [example output: ['major', 'minor', 'harmonic minor']]
 */
export const scales = (): string[] => Object.keys(scaleMaps);

export const chordMaps: NVP<number[]> = {
  '5th': [0, 7],
  fifth: [0, 7],
  'M7#5sus4': [0, 5, 8, 11],
  '7#5sus4': [0, 5, 8, 10],
  sus4: [0, 5, 7],
  'suspended fourth': [0, 5, 7],
  M7sus4: [0, 5, 7, 11],
  '7sus4': [0, 5, 7, 10],
  'suspended fourth seventh': [0, 5, 7, 10],
  '7no5': [0, 4, 10],
  aug: [0, 4, 8],
  '+': [0, 4, 8],
  '+5': [0, 4, 8],
  augmented: [0, 4, 8],
  Mb6: [0, 4, 20],
  M7b6: [0, 4, 8, 11],
  'major seventh flat sixth': [0, 4, 8, 11],
  'maj7#5': [0, 4, 8, 11],
  'maj7+5': [0, 4, 8, 11],
  '+maj7': [0, 4, 8, 11],
  'augmented seventh': [0, 4, 8, 11],
  '7#5': [0, 4, 8, 10],
  '+7': [0, 4, 8, 10],
  '7aug': [0, 4, 8, 10],
  aug7: [0, 4, 8, 10],
  '7b13': [0, 4, 10, 20],
  M: [0, 4, 7],
  major: [0, 4, 7],
  maj7: [0, 4, 7, 11],
  Δ: [0, 4, 7, 11],
  ma7: [0, 4, 7, 11],
  M7: [0, 4, 7, 11],
  Maj7: [0, 4, 7, 11],
  'major seventh': [0, 4, 7, 11],
  '7th': [0, 4, 7, 10],
  dom: [0, 4, 7, 10],
  'dominant seventh': [0, 4, 7, 10],
  add6: [0, 4, 7, 9],
  add13: [0, 4, 7, 9],
  M6: [0, 4, 7, 9],
  sixth: [0, 4, 7, 9],
  '7add6': [0, 4, 7, 10, 21],
  '7add13': [0, 4, 7, 10, 21],
  '7b6': [0, 4, 7, 8, 10],
  Mb5: [0, 4, 6],
  M7b5: [0, 4, 6, 11],
  '7b5': [0, 4, 6, 10],
  'maj#4': [0, 4, 7, 11, 18],
  'Δ#4': [0, 4, 7, 11, 18],
  'Δ#11': [0, 4, 7, 11, 18],
  lydian: [0, 4, 7, 11, 18],
  '7#11': [0, 4, 7, 10, 18],
  '7#4': [0, 4, 7, 10, 18],
  'lydian dominant seventh': [0, 4, 7, 10, 18],
  'M6#11': [0, 4, 7, 9, 18],
  M6b5: [0, 4, 7, 9, 18],
  '6#11': [0, 4, 7, 9, 18],
  '6b5': [0, 4, 7, 9, 18],
  '7#11b13': [0, 4, 7, 10, 18, 20],
  '7b5b13': [0, 4, 7, 10, 18, 20],
  'm#5': [0, 3, 8],
  'm+': [0, 3, 8],
  mb6: [0, 3, 8],
  mb6M7: [0, 3, 8, 11],
  'm7#5': [0, 3, 8, 10],
  m: [0, 3, 7],
  min: [0, 3, 7],
  '-': [0, 4, 7],
  minor: [0, 3, 7],
  'm/ma7': [0, 3, 7, 11],
  'm/maj7': [0, 3, 7, 11],
  mM7: [0, 3, 7, 11],
  mMaj7: [0, 3, 7, 11],
  'm/M7': [0, 3, 7, 11],
  mΔ: [0, 3, 7, 11],
  'minor/major seventh': [0, 3, 7, 11],
  m7: [0, 3, 7, 10],
  min7: [0, 3, 7, 10],
  mi7: [0, 3, 7, 10],
  'minor seventh': [0, 3, 7, 10],
  m6: [0, 3, 7, 9],
  'minor sixth': [0, 3, 7, 9],
  mMaj7b6: [0, 3, 7, 8, 11],
  dim: [0, 3, 6],
  '°': [0, 3, 6],
  o: [0, 3, 6],
  diminished: [0, 3, 6],
  oM7: [0, 3, 6, 11],
  m7b5: [0, 3, 6, 10],
  ø: [0, 3, 6, 10],
  dim7: [0, 3, 6, 9],
  '°7': [0, 3, 6, 9],
  o7: [0, 3, 6, 9],
  'diminished seventh': [0, 3, 6, 9],
  o7M7: [0, 3, 6, 9, 11],
  '4th': [0, 5, 10, 15],
  quartal: [0, 5, 10, 15],
  madd4: [0, 3, 5, 7],
  m7add11: [0, 3, 7, 10, 17],
  m7add4: [0, 3, 7, 10, 17],
  '+add#9': [0, 4, 8, 15],
  '7#5#9': [0, 4, 8, 10, 15],
  '7alt': [0, 4, 8, 10, 15],
  '7#9': [0, 4, 7, 10, 15],
  'dominant sharp ninth': [0, 4, 7, 10, 15],
  '13#9': [0, 4, 7, 10, 15, 21],
  '7#9b13': [0, 4, 7, 10, 15, 20],
  'maj7#9#11': [0, 4, 7, 11, 15, 18],
  '7#9#11': [0, 4, 7, 10, 15, 18],
  '7b5#9': [0, 4, 7, 10, 15, 18],
  '13#9#11': [0, 4, 7, 10, 15, 18, 21],
  '7#9#11b13': [0, 4, 7, 10, 15, 18, 20],
  sus2: [0, 2, 7],
  'suspended second': [0, 2, 7],
  'M9#5sus4': [0, 5, 8, 11, 14],
  sus24: [0, 2, 5, 7],
  sus4add9: [0, 2, 5, 7],
  M9sus4: [0, 5, 7, 11, 14],
  '11th': [0, 7, 10, 14, 17],
  eleventh: [0, 7, 10, 14, 17],
  '9sus4': [0, 5, 7, 10, 14],
  '9sus': [0, 5, 7, 10, 14],
  '13sus4': [0, 5, 7, 10, 14, 21],
  '13sus': [0, 5, 7, 10, 14, 21],
  '9no5': [0, 4, 10, 14],
  '13no5': [0, 4, 10, 14, 21],
  'M#5add9': [0, 4, 8, 14],
  '+add9': [0, 4, 8, 14],
  'maj9#5': [0, 4, 8, 11, 14],
  'Maj9#5': [0, 4, 8, 11, 14],
  '9#5': [0, 4, 8, 10, 14],
  '9+': [0, 4, 8, 10, 14],
  '9b13': [0, 4, 10, 14, 20],
  Madd9: [0, 4, 7, 14],
  add9: [0, 4, 7, 14],
  add2: [0, 4, 7, 14],
  maj9: [0, 4, 7, 11, 14],
  Δ9: [0, 4, 7, 11, 14],
  'major ninth': [0, 4, 7, 11, 14],
  '9th': [0, 4, 7, 10, 14],
  'dominant ninth': [0, 4, 7, 10, 14],
  '6/9': [0, 4, 7, 9, 14],
  'sixth/ninth': [0, 4, 7, 9, 14],
  maj13: [0, 4, 7, 11, 14, 21],
  Maj13: [0, 4, 7, 11, 14, 21],
  'major thirteenth': [0, 4, 7, 11, 14, 21],
  M7add13: [0, 4, 7, 9, 11, 14],
  '13th': [0, 4, 7, 10, 14, 21],
  'dominant thirteenth': [0, 4, 7, 10, 14, 21],
  M9b5: [0, 4, 6, 11, 14],
  '9b5': [0, 4, 6, 10, 14],
  '13b5': [0, 4, 6, 9, 10, 14],
  '9#5#11': [0, 4, 8, 10, 14, 18],
  'maj9#11': [0, 4, 7, 11, 14, 18],
  'Δ9#11': [0, 4, 7, 11, 14, 18],
  'major sharp eleventh (lydian)': [0, 4, 7, 11, 14, 18],
  '9#11': [0, 4, 7, 10, 14, 18],
  '9+4': [0, 4, 7, 10, 14, 18],
  '9#4': [0, 4, 7, 10, 14, 18],
  'M13#11': [0, 4, 7, 11, 14, 18, 21],
  'maj13#11': [0, 4, 7, 11, 14, 18, 21],
  'M13+4': [0, 4, 7, 11, 14, 18, 21],
  'M13#4': [0, 4, 7, 11, 14, 18, 21],
  '13#11': [0, 4, 7, 10, 14, 18, 21],
  '13+4': [0, 4, 7, 10, 14, 18, 21],
  '13#4': [0, 4, 7, 10, 14, 18, 21],
  '9#11b13': [0, 4, 7, 10, 14, 18, 20],
  '9b5b13': [0, 4, 7, 10, 14, 18, 20],
  'm9#5': [0, 3, 8, 10, 14],
  madd9: [0, 3, 7, 14],
  mMaj9: [0, 3, 7, 11, 14],
  m9: [0, 3, 7, 10, 14],
  'minor ninth': [0, 3, 7, 10, 14],
  m69: [0, 3, 7, 9, 14],
  m13: [0, 3, 7, 10, 14, 21],
  'minor thirteenth': [0, 3, 7, 10, 14, 21],
  mMaj9b6: [0, 3, 7, 8, 11, 14],
  m9b5: [0, 2, 3, 6, 10],
  m11A: [0, 3, 8, 10, 14, 17],
  m11: [0, 3, 7, 10, 14, 17],
  'minor eleventh': [0, 3, 7, 10, 14, 17],
  b9sus: [0, 5, 7, 10, 14],
  phryg: [0, 5, 7, 10, 13],
  'suspended fourth flat ninth': [0, 5, 7, 10, 13],
  '11b9': [0, 7, 10, 13, 17],
  '7sus4b9b13': [0, 5, 7, 10, 13, 20],
  '7b9b13sus4': [0, 5, 7, 10, 13, 20],
  alt7: [0, 4, 10, 13],
  altered: [0, 4, 10, 13],
  '7#5b9': [0, 4, 8, 10, 13],
  Maddb9: [0, 4, 7, 13],
  M7b9: [0, 4, 7, 11, 13],
  '7b9': [0, 4, 7, 10, 13],
  'dominant flat ninth': [0, 4, 7, 10, 13],
  '13b9': [0, 4, 7, 10, 13, 21],
  '7b9b13': [0, 4, 7, 10, 13, 20],
  '7#5b9#11': [0, 4, 8, 10, 13, 18],
  '7b9#11': [0, 4, 7, 10, 13, 18],
  '7b5b9': [0, 4, 7, 10, 13, 18],
  '13b9#11': [0, 4, 7, 10, 13, 18, 21],
  '7b9b13#11': [0, 4, 7, 10, 13, 18, 20],
  '7b9#11b13': [0, 4, 7, 10, 13, 18, 20],
  '7b5b9b13': [0, 4, 7, 10, 13, 18, 20],
  mb6b9: [0, 3, 8, 13],
  '7b9#9': [0, 4, 7, 10, 13, 15],
};

/**
 * Get a list of chords available in Scribbletune.
 * @return {Array}     [example output: ['maj', 'min', 'dim']]
 */
export const chords = (): string[] => Object.keys(chordMaps);

/**
 * Generate a scale using static scale maps
 * @param name Name of the scale e.g. C4 major
 */
export const scale = (name: string): string[] => {
  const match: RegExpMatchArray | null = name.match(
    /([A-Ga-g])(b|#)?([0-9])\s([a-zA-Z0-9\s\#]+)/
  );
  const root: string = (match as RegExpMatchArray)[1];
  const accidental: string = (match as RegExpMatchArray)[2] || '';
  const octave: string = (match as RegExpMatchArray)[3];
  const note: string = root + accidental + octave;
  const scaleName: string = (match as RegExpMatchArray)[4];
  if (!scaleMaps[scaleName]) {
    throw `No such scale ${scaleName}`;
  }

  let pitch: number = Util.midiPitchFromNote(note);
  const scaleNotes: string[] = [note];

  for (let i: number = 0; i < scaleMaps[scaleName].length; i++) {
    if (scaleMaps[scaleName][i] === 'A') {
      pitch += 3;
    } else if (scaleMaps[scaleName][i] === 'W') {
      pitch += 2;
    } else {
      // H
      pitch += 1;
    }
    let note = Util.noteFromMidiPitch(
      pitch,
      accidental ? accidental === 'b' : true
    );
    note = note[0].toUpperCase() + note.slice(1);
    scaleNotes.push(note);
  }

  return scaleNotes;
};

/**
 * Generate a chord based on static chord maps
 * @param name
 */
export const chord = (name: string): string[] => {
  const match: RegExpMatchArray | null = name.match(
    /([A-Ga-g])(b|#)?([a-zA-Z0-9\-\+\#\s\Δ\°\ø\(\)\/]+)(\_[0-9])?/
  );
  const root: string = (match as RegExpMatchArray)[1];
  const accidental: string = (match as RegExpMatchArray)[2] || '';
  const octave: string =
    ((match as RegExpMatchArray)[4] &&
      (match as RegExpMatchArray)[4].replace(/\D/, '')) ||
    '4';
  const note: string = root + accidental + octave;
  const chordName: string = (match as RegExpMatchArray)[3];
  if (!chordMaps[chordName]) {
    throw `No such chord ${chordName}`;
  }

  const chromatic: string[] = scale(note + ' chromatic').concat(
    scale(root + accidental + (+octave + 1) + ' chromatic')
  );

  const chordNotes: string[] = [];
  chordMaps[chordName].forEach((idx: number) => {
    chordNotes.push(chromatic[idx]);
  });

  return chordNotes;
};

// const getScaleMaps = (str) => {
//   let scaleMap = '';
//   const scaleNotes = scribble.scale('C4 ' + str);
//   const firstNote = scaleNotes.shift();
//   let currentPitch = jsmidgen.Util.midiPitchFromNote(firstNote);
//   while (scaleNotes.length) {
//     let note = scaleNotes.shift();
//     let pitch = jsmidgen.Util.midiPitchFromNote(note);
//     if (pitch - currentPitch === 3) {
//       scaleMap += 'A';
//     } else if (pitch - currentPitch === 2) {
//       scaleMap += 'W';
//     } else {
//       scaleMap += 'H';
//     }
//     currentPitch = pitch;
//   }
//   return scaleMap;
// };

// scribble.scales().forEach((s) => {
//   console.log(`"${s}": '${getScaleMaps(s)}',`);
// });

// const getChordMaps = (chordName) => {
//   const chordMap = [0];
//   const chordNotes = scribble.chord('C' + chordName);
//   const firstNote = chordNotes.shift();
//   const currentPitch = jsmidgen.Util.midiPitchFromNote(firstNote);
//   while (chordNotes.length) {
//     let note = chordNotes.shift();
//     let pitch = jsmidgen.Util.midiPitchFromNote(note);
//     chordMap.push(pitch - currentPitch);
//   }

//   return chordMap;
// };

// scribble.chords().forEach((s) => {
//   if (unsupportedChordNames.includes(s)) {
//     return;
//   }

//   chordMaps[s] = getChordMaps(s);
// });
