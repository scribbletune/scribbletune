var Modes = require('../lib/modes');

//test if Modes.get returns the C Ionian mode (major scale) if no parameters are passed
exports.test = function(test) {
	test.equal(Modes.get().join(','), [ 'c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3', 'c4' ].join(','));
	test.ok(true, "this assertion should pass");
  test.done();
}

//test if Modes.get throws an error if a wrong mode is passed
exports.testValidMode = function(test) {
	test.throws(function() { Modes.get('c', 3, 'non_existent_mode'); }, Error, 'Wrong mode!');
	test.ok(true, "this assertion should pass");
  test.done();
}