(function() {
	// Synth doesnt accept an array of notes, but Polysynth does (Scribbletune works with notes as arrays)
	scribble.clip({ synth: 'PolySynth', pattern: '-x', notes: 'C4 D4 C4 D#4 C4 D4 C4 Bb3' }).start();
	scribble.clip({ synth: 'PolySynth', pattern: 'xx[xx]', notes: 'C3 Cm-3' }).start();

	// You can even use sound samples with patterns to trigger them
	scribble.clip({ sample: 'https://scribbletune.com/sounds/kick.wav', pattern: 'x' }).start();
	scribble.clip({ sample: 'https://scribbletune.com/sounds/bass.wav', pattern: '[-x]' }).start();
	scribble.clip({ sample: 'https://scribbletune.com/sounds/oh.wav', pattern: '[-x]' }).start();
	scribble.clip({ sample: 'https://scribbletune.com/sounds/ch.wav', pattern: '[xxx]' }).start();
	scribble.clip({ sample: 'https://scribbletune.com/sounds/snare.wav', pattern: '-x' }).start();

	// Wire up start/stop buttons
	document.querySelector('#startBtn').addEventListener('click', function() {
		Tone.Transport.start();
	});
	document.querySelector('#stopBtn').addEventListener('click', function() {
		Tone.Transport.stop();
	});
}())

