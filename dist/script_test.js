(function() {
  function setTest(i, { title, description, channels, playMode }) {
    document.querySelector('#testNumber').textContent = `Test ${i + 1} of ${
      tests.length
    }`;
    document.querySelector('#title').innerHTML = title;
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
    let testsMarkup = tests
      .map((t, index) => {
        return index == i
          ? `<li style="color:blue">${t.title}</li>`
          : `<li style="color:grey">${t.title}</li>`;
      })
      .join('');
    document.querySelector('#all-tests').innerHTML = `<ol>${testsMarkup}</ol>`;
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
          title: t.title + ' <kbd>🚀 offline rendering</kbd>',
          description: t.description,
          channels: t.channels.map(appendOfflineRenderingParams),
        })
      );
  }

  let i;
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
    i = typeof i === "undefined" ? 0 : (i + 1) % tests.length;
    setTest(i, tests[i]);
  }

  function previousTest() {
    pause();
    Tone.Transport.cancel();
    i = i > 0 ? (i - 1) % tests.length : tests.length - 1;
    setTest(i, tests[i]);
  }

  function playPause() {
    isPlaying ? pause() : play();
  }

  document.querySelector('body').addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') nextTest();
    if (event.key === 'ArrowLeft') previousTest();
    if (event.key === 'Enter') playPause();
  });
  document.querySelector('#title');
  document.querySelector('#playPause').addEventListener('click', playPause);
  document.querySelector('#next').addEventListener('click', nextTest);
  document.querySelector('#previous').addEventListener('click', previousTest);

  const tests = [];
  let title;
  let description;
  let session;
  let channels;

  tests.push({
    title: 'Synth',
    description: 'a simple melody',
    channels: [
      {
        instrument: 'Synth',
        clips: [{ pattern: 'x', notes: 'C4 D4 E4' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'Synth <kbd>❓ random notes</kbd>',
    description: 'a simple melody with random notes',
    channels: [
      {
        instrument: 'Synth',
        clips: [{ pattern: 'xxR-', notes: 'C4 C4', randomNotes: 'D4 E4 F4 G4' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'FMSynth <kbd>💡 custom params</kbd>',
    description: 'a simple melody',
    channels: [
      {
        instrument: new Tone.FMSynth({ oscillator: { type: 'sawtooth' } }),
        clips: [{ pattern: 'xx-', notes: 'C4 D4 E4 F4 G4' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'PolySynth',
    description: '4 chords',
    channels: [
      {
        instrument: 'PolySynth',
        clips: [{ pattern: 'xxx-', notes: 'CM-3 Dm-3 Em-3 FM-3' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'PolySynth <kbd>💡 custom params</kbd>',
    description: '4 chords',
    channels: [
      {
        instrument: new Tone.PolySynth(Tone.FMSynth, {
          oscillator: { type: 'sawtooth' },
        }),
        clips: [{ pattern: 'xxx-', notes: 'CM-3 Dm-3 Em-3 FM-3' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'PolySynth <kbd>❓ random notes</kbd> <kbd>💡 custom params</kbd>',
    description: '4 chords',
    channels: [
      {
        instrument: new Tone.PolySynth(Tone.FMSynth, {
          oscillator: { type: 'sawtooth' },
        }),
        clips: [{ pattern: 'xxR-', notes: 'CM-3 Dm-3 Em-3', randomNotes: 'Dm-3 Em-3 FM-3'}],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'MembraneSynth',
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
    title: 'MembraneSynth <kbd>💡 custom params</kbd>',
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
    title: 'Player <kbd>⬇️ buffer</kbd>',
    description: 'a kick',
    channels: [
      {
        sample: 'https://scribbletune.com/sounds/kick.wav',
        clips: [{ pattern: 'x' }],
      },
    ],
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: '5 Players <kbd>⬇️ buffer</kbd>',
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
    toBeAlsoTestedWithOfflineRendering: true,
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
    title: 'Sampler <kbd>⬇️ buffer</kbd>',
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
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'Sampler <kbd>⬇️ buffer</kbd> <kbd>💫 effect</kbd>',
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
    toBeAlsoTestedWithOfflineRendering: true,
  });

  tests.push({
    title: 'NoiseSynth',
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
    title: 'NoiseSynth <kbd>💡 custom params</kbd>',
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
    title:
      'Synth <kbd>💫 effect</kbd> <kbd>💡 custom params</kbd>',
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
      'Synth <kbd>💫 effect</kbd> <kbd>💡 custom params</kbd>',
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

  scribble.addChord(['1P', '5P', '8P', '12P', '15P', '17M', '19P'], [], 'TM');
  scribble.addChord(['1P', '5P', '8P', '12P', '15P', '17m', '19P'], [], 'Tm');
  tests.push({
    title: 'PolySynth <kbd>💡 custom params</kbd> <kbd>🎸 custom chord</kbd>',
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
      'Synth <kbd>💫 effect</kbd> <kbd>💡 custom params</kbd> <kbd>🚀 offline rendering</kbd>',
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
    title:
      '5 Players & 1 Polysynth <kbd>⬇️ buffer</kbd> <kbd>💡 custom params</kbd> <kbd>🎸 custom chord</kbd> <kbd>🎵 play pattern</kbd>',
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
      {
        idx: 'chord',
        instrument: new Tone.PolySynth(Tone.FMSynth, {
          volume: -15,
          oscillator: { type: 'sawtooth' },
        }),
        clips: [
          { pattern: 'x___x___x___x___', notes: 'CTM-2 DTm-2 ETm-2 FTM-2' },
        ],
      },
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
    toBeAlsoTestedWithOfflineRendering: true,
  });

  createOfflineRenderingTests();

  // for debugging
  window.tests = tests;

  let testsMarkup = tests
    .map(t => {
      return `<li>${t.title}</li>`;
    })
    .join('');
  document.querySelector('#all-tests').innerHTML = `<ol>${testsMarkup}</ol>`;
})();
