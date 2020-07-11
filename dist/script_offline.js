(function() {
  const session = new scribble.Session();

  session.createChannel({
    instrument: 'PolySynth',
    clips: [
      { pattern: '[xx]', notes: 'C3 Cm-3' },
      { pattern: '[x-]', notes: 'C3 Cm-3' },
      { pattern: 'xx', notes: 'C3 Cm-3' },
    ],
    offlineRendering: true,
  });

  window.session = session

  let i = 0;
  // Wire up start/stop buttons
  document.querySelector('#startBtn').addEventListener('click', function() {
    console.log("Playing clip", i)
    session.startRow(i);
    Tone.context.resume().then(() => Tone.Transport.start());
  });
  document.querySelector('#stopBtn').addEventListener('click', function() {
    i = (i + 1) % 3
    Tone.Transport.stop();
  });
})();
