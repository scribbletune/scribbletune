'use strict';

const scribble = require('../');

const getRandomPattern = function(count) {
  let str = '';
  for (let i = 0; i < (count || 8); i++) {
    str += Math.round(Math.random()) ? 'x-' : '-x';
  }

  return str;
};

const ptn = getRandomPattern();
function getRiff(key = 'D', scale = 'minor', prog = 'i III ii') {
  const scaleInKey = scribble.scale(key + '3 ' + scale);

  function getClip() {
    const theChords = scribble.getChordsByProgression(key + '3 ' + scale, prog);
    const arpNotes = scribble.arp({
      chords: theChords, // you can even provide a string like 'Cm Fm Cm Fm Cm Gm Cm DM'
      count: 3, // you can set any number from 2 to 8
      order: '102',
    });

    const clip = [];
    let arpNotesCount = 0;

    for (var i = 0; i < ptn.length; i++) {
      if (ptn[i] === 'x') {
        clip.push({ note: [arpNotes[arpNotesCount]], length: 32, level: 127 });
        arpNotesCount++;
      } else {
        clip.push({
          note: [scaleInKey[Math.round(Math.random() * 3)]],
          length: 16,
          level: 127,
        });
        clip.push({ note: null, length: 16, level: 127 });
      }
    }

    return clip;
  }
  const clip = getClip();
  return [...clip, ...clip, ...clip, ...getClip('i v VII')];
}

const dRiff = getRiff('A', 'minor', 'i iv v');
const gRiff = getRiff('E', 'minor', 'i iv v');
const aRiff = getRiff('F', 'major', 'I IV V');

scribble.midi([...dRiff, ...gRiff, ...dRiff, ...aRiff]);
