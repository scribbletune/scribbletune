var Modes = require('../lib/modes');

/*
 * Test function with 0 arguments
 * Calling Modes.get() should return C Ionian mode (C major scale) by default
 */
exports.testZeroArgs = function(test) {
	test.throws(function() { 
		Modes.get().join(','), [ 'c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3', 'c4' ].join(',')
	}, Error);
	test.ok(true);
  test.done();
}



/*
 * Test whether octave is a numeric value
 * Function call with a non numneric value should throw an Error
 */
exports.testIsOctaveNumeric = function(test) {
	test.throws(function() { Modes.get('c', 's') }, Error);
	test.ok(true);
  test.done();
}


/*
 * Test whether octave is between 1 and 8 (both inclusive)
 * Function call with a non numneric value should throw an Error
 */
exports.testOctaveRange = function(test) {
	test.throws(function() { Modes.get('c', 10) }, Error);
	test.ok(true);
  test.done();
}


/*
 * Test whether a valid mode was requested
 * Valid modes are listed in modes.js
 */
exports.testValidMode = function(test) {
	test.throws(function() { Modes.get('c', 3, 'non_existent_mode') }, Error, 'Wrong mode!');
	test.ok(true);
  test.done();
}


/*
 * Test whether a valid root node was specified
 * Valid root notes are c,d,e,f,g,a,b
 */
exports.testValidRootNote = function(test) {
	test.throws(function() { Modes.get('h') }, Error, 'Wrong root note!');
	test.ok(true);
  test.done();
}