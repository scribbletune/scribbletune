/**
 * Test Scribbletune's Midi object
 * -----------------------------------
 */
'use strict';

var st = require('../src/lib/scribbletune');

describe('Scribbletune:Midi', function(){

	describe('writeToFile', function(){
		it(
			'should write provided notes data to a Midi file',
			function() {
				(function(){
					var clip = st.generate.clip({
						notes: st.mode.get(),
						pattern: 'x-x-x-x-x_x_x___'
					});
					st.midi.writeToFile(clip);
				}).should.not.throw()
			}
		)
	});

});