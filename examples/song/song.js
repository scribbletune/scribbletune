'use strict';

const scribble = require('../../');

(() => {
    scribble.addChord(['1P', '5P', '8P', '22P', '24M', '26P'], [], 'fullM');
    scribble.addChord(['1P', '5P', '8P', '22P', '24m', '26P'], [], 'fullm');

    const harmony = scribble.clip({
        notes: ['Efullm', 'GfullM', 'GfullM', 'AfullM'],
        pattern: 'x___xx_x________',
    });

    scribble.midi(harmony, 'harmony.mid');

    const melody = scribble.clip({
        notes: ['e4', 'g4', 'a4', 'a#4', 'b4', 'd4', 'b4', 'a#4', 'a4', 'a#4', 'a4', 'g4', 'd5', 'e5', 'e5', 'd5'],
        pattern: 'x'.repeat(16),
    });

    scribble.midi(melody, 'melody.mid');
})();
