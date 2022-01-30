const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"development"' }
        }),
        new webpack.ProvidePlugin({
            // 'Promise': 'imports?this=>global!exports?global.Promise!babel-polyfill',
            'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        })
        // new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js", Infinity)
    ],
    output: {
        filename: 'admin.js'
    }
});
