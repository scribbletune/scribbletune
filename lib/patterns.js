 var _ = require('lodash');

 var Patterns = {
	generic: [
		'x---------------',	//0
		'x-------x-------',	//1
		'x---x---x---x---', //2
		'x-x-x-x-x-x-x-x-', //3
		'xxxxxxxxxxxxxxxx', //4
		'--x---x---x---x-', //5
		'xxx-xxx-xxx-xxx-', //6
		'-xxx-xxx-xxx-xxx', //7
		'xx--xx--xx--xx--', //8
		'-xx--xx--xx--xx-', //9
		'--xx--xx--xx--xx', //10
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