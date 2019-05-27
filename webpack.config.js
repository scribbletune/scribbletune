const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.ts',
  },

  output: {
    filename: 'scribbletune.js',
    path: path.resolve(__dirname, './dist'),
    library: 'scribble',
    libraryTarget: 'umd',
  },

  devtool: 'source-map',
  // plugins: [],

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
      },
      { test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },

  node: {
    fs: 'empty',
  },
};
