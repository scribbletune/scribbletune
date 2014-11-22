/**
 * Test Scribbletune's Mode object
 * -------------------------------
 */

'use strict';

var st = require('../lib/scribbletune');


/**
 * Scribbletune.mode()
 */
describe('Scribbletune::mode()', function(){
	
	it(
		'should check if provided root note is valid: fail h', 
		function(){
			(function(){
				st.mode('h');
			})
			.should.throw();
		}
	);


	it(
		'should check if provided root note is valid: pass c#', 
		function(){
			(function(){
				st.mode('c#');
			}
			).should.not.throw();
		}
	);


	it(
		'should check if provided mode is valid', 
		function(){
			(function(){
				st.mode('c', 'rubbish');
			}).should.throw();
		}
	);


	it(
		'should return [c3, d3, e3, f3, g3, a3, b3] when root is C and mode is ionian', 
		function(){
			var cIonian = st.mode('c', 'ionian');
			cIonian.join('').should.equal('c3d3e3f3g3a3b3');
		}
	);


	it(
		'should return [d3, e3, f3, g3, a3, b3, c3] when root is D and mode is dorian', 
		function(){
			var dDorain = st.mode('d', 'dorian');
			dDorain.join('').should.equal('d3e3f3g3a3b3c4');
		}
	);

});
