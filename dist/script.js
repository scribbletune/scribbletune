(function() {
  // Play a simply poly synth
  scribble
    .clip({ synth: 'Synth', pattern: '-x', notes: 'C4 D4 C4 D#4 C4 D4 C4 Bb3' })
    .start();
  scribble
    .clip({ synth: 'PolySynth', pattern: 'xx[xx]', notes: 'C3 Cm-3' })
    .start();

  // Use individual sound samples to trigger patterns on them
  scribble
    .clip({
      sample: 'https://scribbletune.com/sounds/kick.wav',
      pattern: 'x',
    })
    .start();
  scribble
    .clip({
      sample: 'https://scribbletune.com/sounds/bass.wav',
      pattern: '[-x]',
    })
    .start();
  scribble
    .clip({ sample: 'https://scribbletune.com/sounds/oh.wav', pattern: '[-x]' })
    .start();
  scribble
    .clip({
      sample: 'https://scribbletune.com/sounds/ch.wav',
      pattern: '[xxx]',
    })
    .start();
  scribble
    .clip({
      sample: 'https://scribbletune.com/sounds/snare.wav',
      pattern: '-x',
    })
    .start();

  // Create a sampler out of individual sound files
  var piano = {
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
  };

  var notes = scribble.chord('Cm7-3');
  // Simply pass the samples object to the clip method as `samples` (plural)
  scribble
    .clip({
      samples: piano,
      pattern: 'x-[xx]-',
      notes: [...notes, ...notes.reverse()],
    })
    .start();
  scribble
    .clip({
      samples: piano,
      pattern: 'x-[xx]-',
      notes: [...notes, ...notes.reverse()],
      effects: ['PingPongDelay'],
      volume: 0.5,
    })
    .start();

  // Wire up start/stop buttons
  document.querySelector('#startBtn').addEventListener('click', function() {
    Tone.Transport.start();
  });
  document.querySelector('#stopBtn').addEventListener('click', function() {
    Tone.Transport.stop();
  });
})();
