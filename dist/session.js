(function() {
	var session = scribble.session();

	var channel1 = session.createChannel({
		sample: 'https://scribbletune.com/sounds/kick.wav',
		clips: [
			{ pattern: 'x' },
			{ pattern: 'x' },
			{ pattern: 'x' }
		]
	});

	var channel2 = session.createChannel({
		sample: 'https://scribbletune.com/sounds/bass.wav',
		clips: [
			{ pattern: '[--xx]' },
			{ pattern: '[-x]' },
			{ pattern: '[xxx]' }
		]
	});

	document.querySelectorAll('.btn').forEach(function(el, idx) {
		el.addEventListener('click', function(e) {
			session.startRow(idx);
		})
	});

	// Wire up start/stop buttons
	document.querySelector('#startBtn').addEventListener('click', function() {
		Tone.Transport.start();
	});
	document.querySelector('#stopBtn').addEventListener('click', function() {
		Tone.Transport.stop();
	});
}())

