'use strict';

exports = module.exports = (function() {
	return {
		mode: require('./ext/mode'),
		pattern: require('./ext/pattern'),
		clip: require('./ext/clip'),
		render: require('./ext/render')
	};
}());
