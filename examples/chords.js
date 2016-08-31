const scribble = require('../src/');
let clip = scribble.clip({
	notes: ['f#m', 'c#m', 'DMaj', 'Bm', 'EMajor', 'AMaj', 'dmaj', 'c#m', 'AMaj'],
	pattern: 'x_______x_______x_______________x_______x_______x_______________________________________________x_______x_______x_______________',
	sizzle: true
});  

scribble.render(clip);
 