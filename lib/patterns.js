 var _ = require('lodash');

 var Patterns = {
	generic: [
		'x---------------',
		'x-------x-------',
		'x---x---x---x---',
		'x-x-x-x-x-x-x-x-',
		'xxxxxxxxxxxxxxxx',
		'--x---x---x---x-',
		'xxx-xxx-xxx-xxx-',
		'-xxx-xxx-xxx-xxx',
		'xx--xx--xx--xx--',
		'-xx--xx--xx--xx-',
		'--xx--xx--xx--xx',
	],

	fancy: [
		'x-xxx-xx-x--x_xx',
		'x_x_x___x___x___',
		'x___x___--x_____x___x___--x_____x___x___________x_x______-------',
		'xxx_x__x_xxx_x__xxx_x__xxx_x__-x'
	],

	generate: function(len) {

		var len = len || 16;
		var str = '';

		for(var i=0; i<len; i++) {
		  str += ['x','-','_'][_.random(2)];
		}

		//replace any occurence of -_ to x_
		return str.replace(/-_/g, 'x_');
		
	}
}

module.exports = Patterns;