(function() {
  const session = new scribble.Session();

  session.createChannel({
    idx: 'synth',
    instrument: 'PolySynth',
    clips: [
      { pattern: 'x---', notes: 'AM-2' },
      { pattern: 'x-x-', notes: 'CM-3 AM-2' },
      { pattern: 'x-[x-x-]-', notes: 'CM-3 AM-2 AM-2' },
    ],
    offlineRendering: true,
    offlineRenderingCallback: () => console.log('Offline rendering finished.'),
  });

  session.createChannel({
    idx: 'beat',
    instrument: 'MembraneSynth',
    clips: [
      { pattern: 'xxxx', notes: 'C1' },
      { pattern: 'xxx[xx]', notes: 'C1' },
      { pattern: 'xxx[xx]', notes: 'C1' },
    ],
    offlineRendering: true,
    offlineRenderingCallback: () => console.log('Offline rendering finished.'),
  });

  session.createChannel({
    idx: 'beat',
    instrument: 'MembraneSynth',
    clips: [
      { pattern: '-', notes: 'C2' },
      { pattern: '-', notes: 'C2' },
      { pattern: '[-x][-x][-x]-', notes: 'C2' },
    ],
  });

  session.createChannel({
    instrument: 'MembraneSynth',
    clips: [
      { pattern: '-', notes: 'C2' },
      { pattern: '-', notes: 'C2' },
      { pattern: '[-x][-x][-x]-', notes: 'C2' },
    ],
  });

  window.session = session; // Useful only for debugging & API exploration, so that you can access the session object in the browser console

  const channelPatterns = [
    {
      channelIdx: 'synth',
      pattern: '-01_2_',
    },
    {
      channelIdx: 'beat',
      pattern: '0__1_2',
    },
  ];
  session.play({channelPatterns, clipDuration:'2:0:0'});

  // Wire up start/stop buttons
  document.querySelector('#startBtn').addEventListener('click', function() {
    Tone.context.resume().then(() => Tone.Transport.start());
  });
  document.querySelector('#stopBtn').addEventListener('click', function() {
    Tone.Transport.stop();
  });
})();
