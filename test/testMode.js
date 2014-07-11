var obj = {};
var mode = require('../lib/ext/mode')(obj);	//the mode module expects an object that it can latch on itself to

describe('Scribbletune:Mode', function(){
	describe('get()', function(){
		
		it('should check if provided root note is valid', function(){
			(function(){
        obj.mode.get('h');
      }).should.throw();
		});

		it('should check if provided mode is valid', function(){
			(function(){
        obj.mode.get('c', 'rubbish');
      }).should.throw();
		});

		it('should return [c, d, e, f, g, a, b] when root is C and mode is ionian', function(){
			var cIonian = obj.mode.get('c', 'ionian');
			cIonian.join('').should.equal('cdefgab');
		});

		it('should return [d, e, f, g, a, b, c] when root is D and mode is dorian', function(){
			var dDorain = obj.mode.get('d', 'dorian');
			dDorain.join('').should.equal('defgabc');
		});

	});
});