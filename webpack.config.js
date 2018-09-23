const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	mode: 'development',
	output: {
		filename: 'scribbletune.js',
		path: path.resolve(__dirname, 'dist'),
		// Make scribbletune available as a global variable called `scribble`
		library: 'scribble',
		libraryTarget: 'umd'
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		watchContentBase: true,
		compress: true,
		port: 3000
	},
	node: {
		fs: 'empty'
	}
};
