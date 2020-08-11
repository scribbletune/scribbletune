(function() {
  function setTest(i, { title, description, channels, playMode }) {
    document.querySelector('#testNumber').textContent = `Test ${i + 1} of ${
      tests.length
    }`;
    document.querySelector('#title').textContent = title;
    document.querySelector(
      '#description'
    ).textContent = `You should hear: ${description}`;
    document.querySelector('#loading').textContent = '❌ Not loaded';
    session = new scribble.Session();
    window.session = session;
    function createChannel(params) {
      session.createChannel(params);
      document.querySelector('#rendering').textContent = params.offlineRendering
        ? '❌ Not rendered'
        : '✔️ Rendered';
    }
    channels.forEach(params => createChannel(params));
    Tone.loaded().then(() => {
      document.querySelector('#loading').textContent = '✔️ Loaded';
    });
    if (playMode) {
      session[playMode.func](...playMode.args);
    } else {
      session.startRow(0);
    }
    console.group(`test ${i}`);
    console.log(title);
    console.log(description);
    console.log('channels', channels);
    console.log('session', session);
    console.groupEnd();
  }

  function appendOfflineRenderingParams(params) {
    return {
      ...params,
      offlineRendering: true,
      offlineRenderingCallback: () => {
        console.log('Offline rendering finished.');
        document.querySelector('#rendering').textContent = '✔️ Rendered';
      },
    };
  }

  function createOfflineRenderingTests() {
    tests
      .filter(t => t.toBeAlsoTestedWithOfflineRendering)
      .forEach(t =>
        tests.push({
          title: t.title + ' (offline rendering)',
          description: t.description,
          channels: t.channels.map(appendOfflineRenderingParams),
        })
      );
  }

  let i = 0;
  let isPlaying = false;

  function play() {
    console.log('Playing test', i);
    Tone.context.resume().then(() => Tone.Transport.start());
    isPlaying = true;
    document.querySelector('#playPause').innerHTML = 'Pause <kbd>⏎ Enter</kbd>';
  }

  function pause() {
    Tone.Transport.stop();
    isPlaying = false;
    document.querySelector('#playPause').innerHTML = 'Play <kbd>⏎ Enter</kbd>';
  }

  function nextTest() {
    pause();
    Tone.Transport.cancel();
    setTest(i, tests[i]);
    i = (i + 1) % tests.length;
  }

  function playPause() {
    isPlaying ? pause() : play();
  }

  document.querySelector('body').addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') nextTest();
    if (event.key === 'Enter') playPause();
  });
  document.querySelector('#title');
  document.querySelector('#playPause').addEventListener('click', playPause);
  document.querySelector('#next').addEventListener('click', nextTest);

  const tests = [];
  let title;
  let description;
  let session;
  let channels;

  tests.push({
    title: 'Synth with default params',
    description: 'a simple melody',
    channels: [
      {
        instrument: 'Synth',
        clips: [{ pattern: '-x', notes: 'C4 D4 C4 D#4 C4 D4 C4 Bb3' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'Synth with custom params',
    description: 'a simple melody',
    channels: [
      {
        instrument: new Tone.Synth({ oscillator: { type: 'sawtooth' } }),
        clips: [{ pattern: '-x', notes: 'C4 D4 C4 D#4 C4 D4 C4 Bb3' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'FMSynth with default params',
    description: 'a simple melody',
    channels: [
      {
        instrument: 'FMSynth',
        clips: [{ pattern: '-x', notes: 'C4 D4 C4 D#4 C4 D4 C4 Bb3' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'FMSynth with custom params',
    description: 'a simple melody',
    channels: [
      {
        instrument: new Tone.FMSynth({ oscillator: { type: 'sawtooth' } }),
        clips: [{ pattern: '-x', notes: 'C4 D4 C4 D#4 C4 D4 C4 Bb3' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'PolySynth with default params',
    description: '4 chords',
    channels: [
      {
        instrument: 'PolySynth',
        clips: [{ pattern: 'xxxx', notes: 'CM-3 Dm-3 Em-3 FM-3' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'PolySynth with custom params',
    description: '4 chords',
    channels: [
      {
        instrument: new Tone.PolySynth(Tone.FMSynth, {
          oscillator: { type: 'sawtooth' },
        }),
        clips: [{ pattern: 'xxxx', notes: 'CM-3 Dm-3 Em-3 FM-3' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'MembraneSynth with default params',
    description: 'a kick',
    channels: [
      {
        instrument: 'MembraneSynth',
        clips: [{ pattern: 'xx[xx]', notes: 'C1' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'MembraneSynth with custom params',
    description: 'a kick',
    channels: [
      {
        instrument: new Tone.MembraneSynth({
          oscillator: { type: 'sawtooth' },
        }),
        clips: [{ pattern: 'xx[xx]', notes: 'C1' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'Player loading an external wav',
    description: 'a kick',
    channels: [
      {
        sample: 'https://scribbletune.com/sounds/kick.wav',
        clips: [{ pattern: 'x' }],
      },
    ],
  });

  tests.push({
    title: 'Player loading an external wav',
    description: 'a bass',
    channels: [
      {
        sample: 'https://scribbletune.com/sounds/bass.wav',
        clips: [{ pattern: '[-x]' }],
      },
    ],
  });

  tests.push({
    title: '2 Players loading an external wav',
    description: 'a kick & a bass',
    channels: [
      {
        sample: 'https://scribbletune.com/sounds/kick.wav',
        clips: [{ pattern: 'x' }],
      },
      {
        sample: 'https://scribbletune.com/sounds/bass.wav',
        clips: [{ pattern: '[-x]' }],
      },
    ],
  });

  tests.push({
    title: '5 Players loading an external wav',
    description: 'a kick, a bass, an "oh", a "ch", a snare',
    channels: [
      {
        sample: 'https://scribbletune.com/sounds/kick.wav',
        clips: [{ pattern: 'x' }],
      },
      {
        sample: 'https://scribbletune.com/sounds/bass.wav',
        clips: [{ pattern: '[-x]' }],
      },
      {
        sample: 'https://scribbletune.com/sounds/oh.wav',
        clips: [{ pattern: '[-x]' }],
      },
      {
        sample: 'https://scribbletune.com/sounds/ch.wav',
        clips: [{ pattern: '[xxx]' }],
      },
      {
        sample: 'https://scribbletune.com/sounds/snare.wav',
        clips: [{ pattern: '-x' }],
      },
    ],
  });

  const piano = {
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
  const notes = scribble.chord('Cm7-3');

  tests.push({
    title: 'Sampler loading a list of external wav',
    description: 'a piano melody',
    channels: [
      {
        samples: piano,
        clips: [
          {
            pattern: 'x-[xx]-',
            notes: [...notes, ...notes.reverse()],
          },
        ],
      },
    ],
  });

  tests.push({
    title: 'Sampler loading a list of external wav & an effect',
    description:
      'a piano melody, with an lateral echo effect ("PingPongDelay")',
    channels: [
      {
        samples: piano,
        clips: [
          {
            pattern: 'x-[xx]-',
            notes: [...notes, ...notes.reverse()],
            effects: ['PingPongDelay'],
            volume: 0.5,
          },
        ],
      },
    ],
  });

  tests.push({
    title: 'NoiseSynth with default params',
    description: 'a snare without duration: "tss - tss tss-tss-tss"',
    channels: [
      {
        instrument: 'NoiseSynth',
        clips: [{ pattern: 'x[x[xxx]]' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'NoiseSynth with custom params',
    description:
      'a snare with variable duration: "tsschhhh-tsschh-tssch-tssch"',
    channels: [
      {
        instrument: new Tone.NoiseSynth({ envelope: { sustain: 0.1 } }),
        clips: [{ pattern: 'x-[x-]-[x---]-[x-------]-' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'NoiseSynth with custom params',
    description:
      'a snare with constant duration: "tssch tssch tssch-tssch-tssch"',
    channels: [
      {
        instrument: new Tone.NoiseSynth({ envelope: { sustain: 0.1 } }),
        clips: [{ pattern: 'x[x[xxx]]', dur: '32n' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'NoiseSynth with custom params, ignoring notes',
    description:
      'a snare with constant duration: "tssch tssch tssch-tssch-tssch"',
    channels: [
      {
        instrument: new Tone.NoiseSynth({ envelope: { sustain: 0.1 } }),
        clips: [{ pattern: 'x[x[xxx]]', dur: '32n', note: 'C3' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'Synth with default params + 1 Effect with default params',
    description: 'a long note with a tremolo',
    channels: [
      {
        instrument: 'Synth',
        clips: [{ pattern: 'x_______', notes: 'C3' }],
        effects: 'AutoFilter',
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title:
      'Synth with default params + 1 Effect with default params + 1 Effect with custom params',
    description: 'a long note with a fast tremolo & "cheap electronics" sound',
    channels: [
      {
        instrument: 'Synth',
        clips: [{ pattern: 'x_______', notes: 'C3' }],
        effects: [new Tone.AutoFilter({ frequency: 12 }), 'BitCrusher'],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title:
      'Synth with default params + 1 Effect with default params + 1 Effect with custom params',
    description:
      'a long note with a fast tremolo then a note with "cheap electronics" sound',
    channels: [
      {
        instrument: 'Synth',
        clips: [{ pattern: 'x__-----', notes: 'C3' }],
        effects: new Tone.AutoFilter({ frequency: 12 }),
      },
      {
        instrument: 'Synth',
        clips: [{ pattern: '----x__-', notes: 'C3' }],
        effects: 'BitCrusher',
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'FMSynth with custom params + 1 Effect with custom params',
    description: 'a long note with a fast tremolo',
    channels: [
      {
        instrument: new Tone.FMSynth({ oscillator: { type: 'sawtooth' } }),
        clips: [{ pattern: 'x_______', notes: 'C3' }],
        effects: new Tone.AutoFilter({ frequency: 12 }),
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  scribble.addChord(['1P', '5P', '8P', '12P', '15P', '17M', '19P'], [], 'TM');
  scribble.addChord(['1P', '5P', '8P', '12P', '15P', '17m', '19P'], [], 'Tm');
  tests.push({
    title: 'PolySynth of FMSynth with custom params with a custom chord',
    description: '4 chords, rich sound',
    channels: [
      {
        instrument: new Tone.PolySynth(Tone.AMSynth, {
          oscillator: { type: 'sawtooth' },
        }),
        clips: [{ pattern: 'xxxx', notes: 'CTM-0 DTm-0 ETm-0 FTM-0' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title:
      'Synth with default params + 1 Effect with default params + 1 Effect with custom params (1 with offline rendering & 1 normal)',
    description:
      'a long note with a fast tremolo then a note with "cheap electronics" sound',
    channels: [
      appendOfflineRenderingParams({
        instrument: 'Synth',
        clips: [{ pattern: 'x__-----', notes: 'C3' }],
        effects: new Tone.AutoFilter({ frequency: 12 }),
      }),
      {
        instrument: 'Synth',
        clips: [{ pattern: '----x__-', notes: 'C3' }],
        effects: 'BitCrusher',
      },
    ],
  });

  tests.push({
    title: '5 Players loading an external wav, with a play pattern',
    description:
      'introduced one after another: a kick, a bass, an "oh", a "ch" & a snare',
    channels: [
      {
        idx: 'kick',
        sample: 'https://scribbletune.com/sounds/kick.wav',
        clips: [{ pattern: 'x' }],
      },
      {
        idx: 'bass',
        sample: 'https://scribbletune.com/sounds/bass.wav',
        clips: [{ pattern: '[-x]' }],
      },
      {
        idx: 'oh',
        sample: 'https://scribbletune.com/sounds/oh.wav',
        clips: [{ pattern: '[-x]' }],
      },
      {
        idx: 'ch',
        sample: 'https://scribbletune.com/sounds/ch.wav',
        clips: [{ pattern: '[xxx]' }],
      },
      {
        idx: 'snare',
        sample: 'https://scribbletune.com/sounds/snare.wav',
        clips: [{ pattern: '-x' }],
      },
    ],
    playMode: {
      func: 'play',
      args: [
        {
          clipDuration: '1:0:0',
          channelPatterns: [
            { channelIdx: 'kick', pattern: '0_____' },
            { channelIdx: 'bass', pattern: '-0____' },
            { channelIdx: 'oh', pattern: '--0___' },
            { channelIdx: 'ch', pattern: '---0__' },
            { channelIdx: 'snare', pattern: '----0_' },
          ],
        },
      ],
    },
  });

  tests.push({
    title:
      '5 Players loading an external wav + 1 chord offline rendered using custom chords, with a play pattern',
    description:
      'introduced one after another: a kick, a bass, an "oh", a "ch", a snare & a chord',
    channels: [
      {
        idx: 'kick',
        sample: 'https://scribbletune.com/sounds/kick.wav',
        clips: [{ pattern: 'x' }],
      },
      {
        idx: 'bass',
        sample: 'https://scribbletune.com/sounds/bass.wav',
        clips: [{ pattern: '[-x]' }],
      },
      {
        idx: 'oh',
        sample: 'https://scribbletune.com/sounds/oh.wav',
        clips: [{ pattern: '[-x]' }],
      },
      {
        idx: 'ch',
        sample: 'https://scribbletune.com/sounds/ch.wav',
        clips: [{ pattern: '[xxx]' }],
      },
      {
        idx: 'snare',
        sample: 'https://scribbletune.com/sounds/snare.wav',
        clips: [{ pattern: '-x' }],
      },
      appendOfflineRenderingParams({
        idx: 'chord',
        instrument: new Tone.PolySynth(Tone.FMSynth, {
          volume: -15,
          oscillator: { type: 'sawtooth' },
        }),
        clips: [
          { pattern: 'x___x___x___x___', notes: 'CTM-2 DTm-2 ETm-2 FTM-2' },
        ],
      }),
    ],
    playMode: {
      func: 'play',
      args: [
        {
          clipDuration: '1:0:0',
          channelPatterns: [
            { channelIdx: 'kick', pattern: '0________' },
            { channelIdx: 'bass', pattern: '-0_______' },
            { channelIdx: 'oh', pattern: '--0______' },
            { channelIdx: 'ch', pattern: '---0_____' },
            { channelIdx: 'snare', pattern: '----0____' },
            { channelIdx: 'chord', pattern: '-----0___' },
          ],
        },
      ],
    },
  });

  createOfflineRenderingTests();

  // for debugging
  window.tests = tests;
})();
