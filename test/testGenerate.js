/**
 * Test Scribbletune's Generate object
 * -----------------------------------
 */
'use strict';

var st = require('../lib/scribbletune');

describe('Scribbletune:Generate', function(){

	/**
	 * Scribbletune.generate.clip()
	 */
	describe('clip()', function(){

		it(
			'should use a default pattern, notes and note length if no params are passed', 
			function(){
				var clip = st.generate.clip();
				clip[0].should.have.property('length', 512);
			}
		);

		it(
			'should use provided pattern', 
			function(){
				var clip = st.generate.clip({
					notes: ['d3'], 
					pattern: 'x_______x_______'
				});
				clip[0].should.have.property('length', 256);
			}
		);

		
		it(
			'should use a default set of notes if notes are not provided', 
			function(){
				var clip = st.generate.clip();
				clip[0].should.have.property('note', 'c3');
			}
		);


		it(
			'should use provided notes', 
			function(){
				var clip = st.generate.clip({
					notes: ['d3']
				});
				clip[0].should.have.property('note', 'd3');
			}
		);

	});
});