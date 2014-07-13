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
			'should use a default pattern if one is not provided', 
			function(){
				(function(){
					st.generate.clip();
				}).should.not.throw();
			}
		);

		
		it(
			'should use a default set of notes if notes are not provided', 
			function(){
			
			}
		);


		it(
			'should check if a valid set of notes is provided', 
			function(){

			}
		);

	});
});