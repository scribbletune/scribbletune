const scribble = require('../src/index');
const express = require('express');
const app = express();

console.log(scribble);

// var clip1 = scribble.clip({
// 	notes: ['c4'],
// 	pattern: 'xx_-'.repeat(32)
// }); 

// console.log(scribble.toBase64String(clip1));

app.use(express.static(__dirname));

app.set('port', 5000 || process.env.PORT);

app.get('/', function(req, res) {

	var clip1 = scribble.clip({
		notes: ['c4'],
		pattern: 'xx_-'.repeat(32)
	}); 	
	console.log('here too');
	// res.send('here');
	res.send(scribble.toBase64String(clip1));

});

app.listen(app.get('port'), function() {
	console.log('App listening on port ' + app.get('port'));
});
