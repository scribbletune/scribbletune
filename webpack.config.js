const path = require('path');

const getOutput = () => {
  const output = {
    filename: 'index.js',
    path: __dirname,
    libraryTarget: 'commonjs',
  };

  if (process.env.TARGET === 'browser') {
    output.filename = 'browser.js';
  }

  if (process.env.TARGET === 'cdn') {
    output.filename = 'scribbletune.js';
    output.path = path.resolve(__dirname, './dist');
    output.library = 'scribble';
    output.libraryTarget = 'umd';
  }

  if (process.env.TARGET === 'max') {
    output.filename = 'max.js';
  }

  return output;
};

const getEntry = () => {
  let main = './src/index.ts';
  if (process.env.TARGET === 'browser' || process.env.TARGET === 'cdn') {
    main = './src/browser-index.ts';
  }
  if (process.env.TARGET === 'max') {
    main = './src/max-index.ts';
  }
  return {
    main,
  };
};

const plugins = [];
plugins.push(new DtsBundlePlugin());

module.exports = {
  // mode: 'production',
  entry: getEntry(),
  output: getOutput(),
  devtool: process.env.TARGET === 'cdn' ? 'source-map' : '',

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

  plugins: plugins,
  // node: {
  //   fs: 'empty',
  // },
  externals: {
    fs: 'fs',
  },
};

function DtsBundlePlugin() {}
DtsBundlePlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    var dts = require('dts-bundle');

    dts.bundle({
      name: 'scribbletune',
      main: 'lib/index.d.ts',
      out: '../index.d.ts',
      removeSource: true,
      outputAsModuleFolder: true, // to use npm in-package typings
    });
  });
};
