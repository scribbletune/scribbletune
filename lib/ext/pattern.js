var _ = require('lodash');


/**
 * Generate a single sample of length len
 * @param  {Number} len Length of the sample required
 * @return {String}     Sample e.g. x---
 */
function generateSample (len, arr) {

	var sample = '';

	for (var i = 0; i < len; i++) {
		sample += arr[_.random(arr.length-1)];
	}

	if(sample.indexOf('x') < 0) sample = 'x' + sample.slice(1);
	if(sample[0] == '_') sample = 'x' + sample.slice(1);
	sample = sample.replace(/-_/g, '-x');
	return sample;
	
};

module.exports = function(Scribbletune) {

	/**
	 * Generate a single sample of length len (e.g. x--- OR --x_) 
	 * and repeat it n number of times to create a pattern
	 * @param  {Number} len Sample length
	 * @param  {Number} n   Quantifier
	 * @param  {String} arr Sample array - items to be used in the generation(optional) e.g. x-_
	 * @return {String}     Pattern e.g. x---x---x---x---
	 */
	Scribbletune.pattern = function (len, n, arr) {
		var sample = generateSample(len || 4, arr && arr.split('') || ['x', '-', '_'])
		return _.times(n || 4, function(){ return sample }).join('');
	}
	
};