var webpack = require('webpack');
var path    = require('path');
var exec    = require('child_process').execSync;
// var pwd     = exec('pwd').toString();

module.exports = {
  entry: {
    app: './app/main.js'
  },
  externals: {
    jquery: 'jQuery',
    'grav-form': 'GravForm'
  },
  module: {
    rules: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.js$/, loader: 'eslint', exclude: /node_modules/ },
      { test: /\.js$/,  loader: 'babel', exclude: /node_modules/, options: { presets: ['es2015'] } }
    ]
  }
};
