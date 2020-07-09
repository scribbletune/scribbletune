// import * as scribble from '../src';
var scribble = require('../');
scribble.addChord(['1P', '5P', '8P', '22P', '24M', '26P'], ['Q1'], 'full');
scribble.addChord(['1P', '5P', '8P', '19P', '22P', '24M'], ['Q2'], 'hey');
scribble.Tonal.ChordType.add(['1P', '5P', '8P', '22P', '24M', '26P'], ['Q3'], 'mesh');
scribble.Tonal.ChordType.add(['1P', '5P', '8P', '19P', '22P', '24M'], ['Q4'], 'things');
var clip = scribble.clip({
    notes: 'CQ1-2 FQ2-2 GQ2-2',
    pattern: 'x_xx',
    subdiv: '1m'
});
console.log(clip);
scribble.midi(clip, 'chords.mid');
