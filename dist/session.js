(function() {
  var session = new scribble.Session();

  session.createChannel({
    sample: 'https://scribbletune.com/sounds/ch.wav',
    volume: 1,
    clips: [{ pattern: '[xx]' }, { pattern: 'x' }, { pattern: '[-x]' }],
  });

  session.createChannel({
    sample: 'https://scribbletune.com/sounds/bass.wav',
    clips: [
      { pattern: '[--xx]' },
      { pattern: '[-xxx]' },
      { pattern: '[-x][--xx][-x][-xxx]' },
    ],
    volume: 0.4,
  });

  session.createChannel({
    sample: 'https://scribbletune.com/sounds/kick.wav',
    clips: [{ pattern: 'x' }, { pattern: 'x-' }, { pattern: 'x' }],
  });

  session.createChannel({
    sample: 'https://scribbletune.com/sounds/snare.wav',
    clips: [
      { pattern: '-x-x-x-[xx]' },
      { pattern: '-x[-x]' },
      { pattern: '-x-[xxx]' },
    ],
  });

  var theChords = scribble.getChordsByProgression(
    'C4 major',
    'i iv i iv i v i II'
  );

  var notesArr = scribble.arp({
    chords: theChords,
    count: 4, // you can set any number from 2 to 8
    // The default value of order is 01234567 as count is 8 by default
    // but here we set count to 4 hence we are only using the first 4 indices to set a order
    order: '1032',
  });

  session.createChannel({
    samples: {
      C3: 'https://scribbletune.com/sounds/piano/piano48.wav',
      'C#3': 'https://scribbletune.com/sounds/piano/piano49.wav',
      D3: 'https://scribbletune.com/sounds/piano/piano50.wav',
      'D#3': 'https://scribbletune.com/sounds/piano/piano51.wav',
      E3: 'https://scribbletune.com/sounds/piano/piano52.wav',
      F3: 'https://scribbletune.com/sounds/piano/piano53.wav',
      'F#3': 'https://scribbletune.com/sounds/piano/piano54.wav',
      G3: 'https://scribbletune.com/sounds/piano/piano55.wav',
      'G#3': 'https://scribbletune.com/sounds/piano/piano56.wav',
      A4: 'https://scribbletune.com/sounds/piano/piano57.wav',
      'A#4': 'https://scribbletune.com/sounds/piano/piano58.wav',
      B4: 'https://scribbletune.com/sounds/piano/piano59.wav',
      C4: 'https://scribbletune.com/sounds/piano/piano60.wav',
    },
    clips: [
      {
        pattern: '[xx]',
        notes: notesArr,
      },
      { pattern: '[xx]', notes: scribble.arp('CM FM CM GM') },
      { pattern: '[xxxx]', notes: notesArr },
    ],
    volume: 0.2,
  });

  document.querySelectorAll('.btn').forEach(function(el, idx) {
    el.addEventListener('click', function(e) {
      session.startRow(idx);
    });
  });

  session.startRow(0);

  // Wire up start/stop buttons
  document.querySelector('#startBtn').addEventListener('click', function() {
    Tone.Transport.start();
  });
  document.querySelector('#stopBtn').addEventListener('click', function() {
    Tone.Transport.stop();
  });
})();
