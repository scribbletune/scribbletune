/**
 * Test Scribbletune's Mode object
 * -------------------------------
 */

'use strict';

var st = require('../lib/scribbletune');

describe('Scribbletune:Mode', function(){

	/**
	 * Scribbletune.mode.get()
	 */
	describe('get()', function(){
		
		it(
			'should check if provided root note is valid: fail h', 
			function(){
				(function(){
			    	st.mode.get('h');
				})
				.should.throw();
			}
		);


		it(
			'should check if provided root note is valid: pass c#', 
			function(){
				(function(){
			    	st.mode.get('c#');
				}
			).should.not.throw();
		});


		it(
			'should check if provided mode is valid', 
			function(){
				(function(){
					st.mode.get('c', 'rubbish');
				}).should.throw();
			}
		);


		it(
			'should return [c, d, e, f, g, a, b] when root is C and mode is ionian', 
			function(){
				var cIonian = st.mode.get('c', 'ionian');
				cIonian.join('').should.equal('cdefgab');
			}
		);


		it(
			'should return [d, e, f, g, a, b, c] when root is D and mode is dorian', 
			function(){
				var dDorain = st.mode.get('d', 'dorian');
				dDorain.join('').should.equal('defgabc');
			}
		);

	});
});