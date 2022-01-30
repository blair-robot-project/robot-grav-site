const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require('webpack');

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
            "process.env": { NODE_ENV: '"production"' }
        }),
        new webpack.ProvidePlugin({
            // 'Promise': 'imports?this=>global!exports?global.Promise!babel-polyfill',
            'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        })
        // new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.min.js", Infinity)
    ],
    output: {
        filename: "[name].min.js"
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: Infinity,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    test: /[\\/]node_modules[\\/]/,
                    reuseExistingChunk: true,
                    name: "vendor",
                },
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                    name: "vendor",
                },
                default: {
                    minChunks: Infinity,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            }
        }
    }
});
