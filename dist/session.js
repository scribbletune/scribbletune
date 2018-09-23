(function() {
	var session = scribble.session();

	var channel1 = session.createChannel({
		sample: 'https://scribbletune.com/sounds/ch.wav',
		clips: [
			{ pattern: '[xx]' },
			{ pattern: 'x' },
			{ pattern: '[-x]' }
		]
	});

	var channel2 = session.createChannel({
		sample: 'https://scribbletune.com/sounds/bass.wav',
		clips: [
			{ pattern: '[--xx]' },
			{ pattern: 'x', effects: ['PingPongDelay'] },
			{ pattern: '[xx]' }
		]
	});

	var channel3 = session.createChannel({
		synth: 'PolySynth',
		clips: [
			{ pattern: '[--xx]', notes: 'C4 Eb4' },
			{ pattern: '[-x]', notes: 'Eb4 G4' },
			{ pattern: '[xx]', notes: 'G4 Bb4' }
		],
		volume: -24
	});

	var channel4 = session.createChannel({
		samples: {
			'C3' : 'https://scribbletune.com/sounds/piano/piano48.wav',
			'C#3' : 'https://scribbletune.com/sounds/piano/piano49.wav',
			'D3' : 'https://scribbletune.com/sounds/piano/piano50.wav',
			'D#3' : 'https://scribbletune.com/sounds/piano/piano51.wav',
			'E3' : 'https://scribbletune.com/sounds/piano/piano52.wav',
			'F3' : 'https://scribbletune.com/sounds/piano/piano53.wav',
			'F#3' : 'https://scribbletune.com/sounds/piano/piano54.wav',
			'G3' : 'https://scribbletune.com/sounds/piano/piano55.wav',
			'G#3' : 'https://scribbletune.com/sounds/piano/piano56.wav',
			'A4' : 'https://scribbletune.com/sounds/piano/piano57.wav',
			'A#4' : 'https://scribbletune.com/sounds/piano/piano58.wav',
			'B4' : 'https://scribbletune.com/sounds/piano/piano59.wav',
			'C4' : 'https://scribbletune.com/sounds/piano/piano60.wav'
		},
		clips: [
			{ pattern: 'xx', notes: scribble.scale('C3 minor').filter((n, i) => i % 2 === 0) },
			{ pattern: '[-x]', notes: 'C3 C4' },
			{ pattern: '[xx]', notes: 'G3 C4' }
		],
		effects: ['Freeverb', 'PingPongDelay'],
		volume: -18
	});

	document.querySelectorAll('.btn').forEach(function(el, idx) {
		el.addEventListener('click', function(e) {
			session.startRow(idx);
		})
	});

	session.startRow(0);

	// Wire up start/stop buttons
	document.querySelector('#startBtn').addEventListener('click', function() {
		Tone.Transport.start();
	});
	document.querySelector('#stopBtn').addEventListener('click', function() {
		Tone.Transport.stop();
	});
}())

