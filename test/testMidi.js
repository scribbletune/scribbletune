/**
 * Test Scribbletune's Midi object
 * -----------------------------------
 */
'use strict';
var st = require('../lib/scribbletune');

describe('Scribbletune::render', function() {
	it(
		'should write provided notes data to a Midi file',
		function() {
			(function() {
				var clip = st.clip({
					notes: st.mode(),
					pattern: 'x-x-x-x-x_x_x___'
				});
				st.render(clip);
			}).should.not.throw();
		}
	)
});
