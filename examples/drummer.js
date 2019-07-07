/**
 * Simple Drummer
 * This script makes use of the `R` character in patterns to randomly add a note
 * at the specified location. If a note will be added, then it s level will be set to
 * the value of accentLow value (default: 70) of the clip.
 *
 * Run this script and use a kick, snare, closed hats and open hats sample to
 * play it in your DAW.
 */

'use strict';

const scribble = require('../');

// kick
const kick = scribble.clip({
  notes: 'c4',
  pattern: 'xxxxxxx[xR]xxxxxxx[x[RR]]'.repeat(4),
});

scribble.midi(kick, 'kick.mid');

// closed hats
const ch = scribble.clip({
  notes: 'c4',
  pattern: '[xR][x[xR]]'.repeat(8),
  subdiv: '8n',
  accentLow: 60,
});

scribble.midi(ch, 'ch.mid');

// open hats
const oh = scribble.clip({
  notes: 'c4',
  pattern: '[-x][Rx][Rx][Rx]'.repeat(8),
});
scribble.midi(oh, 'oh.mid');

// snare
const snare = scribble.clip({
  notes: 'c4',
  pattern: '-x-R-x-[xR]'.repeat(8),
});

scribble.midi(snare, 'snare.mid');
