var Modes = require('../lib/modes');
console.log(Modes.get());
exports.test = function(test) {
	test.equal(Modes.get().join(','), [ 'c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3', 'c4' ].join(','));
	test.ok(true, "this assertion should pass");
  test.done();
}