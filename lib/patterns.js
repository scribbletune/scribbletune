var Patterns = {
	//assume 16 beat
	whole: 					'x---------------',
	half: 					'x-------x-------',
	quarterNotes: 	'x---x---x---x---',
	eightNotes: 		'x-x-x-x-x-x-x-x-',
	sixteenthNotes: 'xxxxxxxxxxxxxxxx',
	thirds: 				'--x---x---x---x-',
	triplets: 			'xxx-xxx-xxx-xxx-',
	triplets1:  		'-xxx-xxx-xxx-xxx',
	doubles:  			'xx--xx--xx--xx--',
	doubles1:  			'-xx--xx--xx--xx-',
	doubles2:  			'--xx--xx--xx--xx',

};


module.exports = Patterns;



/*
 * Idea for patterns
 * -----------------
 * A. An array made up of patternNoteObjects which has 
 *   1. noteOn / noteOff
 *   2. noteLength
 *   3. noteAccent (optional)
 * 
 * B. A way to tag the entire pattern. Like giving it keywords so that it becomes descriptive.
 *
 * C. A function that lets users enter a cryptic string to create a pattern on the fly. The newPatterns object will
 * then return the required patternNoteObj array.
 */

/*
 * Sample return object that this module will return:
*/
var sampleReturnArray = [
	{
		note: false,
		length: 32
	},
	{
		note: true,
		length: 32
	},
	{
		note: true,
		length: 32
	},
	{
		note: true,
		length: 32
	}
];

/*
 * Sample cryptic string that can be specified by user to get pattern in the above format:
*/
var sampleUserPattern = {
	pattern: 'x-x___x-x---xx--',
	unitLength: 32		//this will help define the grid whether this is a 16beat bar / 32 beat bar etc.
}