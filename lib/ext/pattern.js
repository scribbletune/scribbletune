var _ = require('lodash');

module.exports = function(Scribbletune) {
	
	var Pattern = function () {};

	Pattern.patterns = [];

	/**
	 * Generate a single sample of length len (e.g. x---) 
	 * and repeat it n number of times to create a pattern
	 * @param  {Number} len Sample length
	 * @param  {Number} n   Quantifier
	 * @param  {String} arr Sample array (optional) e.g. x-_
	 * @return {String}     Pattern e.g. x---x---x---x---
	 */
	Pattern.generate = function (len, n, arr) {
		
		var 
			self = this, 
			sample = self._generateSample(len || 4, arr && arr.split('') || ['x', '-', '_'])
		;

		return _.times(n || 4, function(){ return sample }).join('');

	};

	/**
	 * Generate a single sample of length len
	 * @param  {Number} len Length of the sample required
	 * @return {String}     Sample e.g. x---
	 */
	Pattern._generateSample = function (len, arr) {

		var sample = '';

		for (var i = 0; i < len; i++) {
			sample += arr[_.random(arr.length-1)];
		}

		if(sample.indexOf('x') < 0) sample = 'x' + sample.slice(1);
		if(sample[0] == '_') sample = 'x' + sample.slice(1);
		sample = sample.replace(/-_/g, '-x');
		return sample;
		
	};

	Scribbletune.pattern = Pattern;
	
};