const webpack = require('webpack');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const exec = require('child_process').execSync;
// const pwd = exec('pwd').toString();

module.exports = {
  mode: "production",
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
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, options: { presets: ['@babel/preset-env'] } }
    ]
  },
  plugins: [new ESLintPlugin({})]
};
