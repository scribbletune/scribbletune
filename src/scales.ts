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
export const scales = (): string[] => {
  return Object.keys(scaleMaps);
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
