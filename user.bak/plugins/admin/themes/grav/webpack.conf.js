const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: './app/main.js',
        vendor: [
            'codemirror',
            'chartist',
            'selectize',
            'rangetouch',
            'remodal',
            'toastr',
            'bootstrap',
            'sortablejs',
            'dropzone',
            'eonasdan-bootstrap-datetimepicker',
            'watchjs',
            'js-yaml',
            'speakingurl'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'js'),
        library: 'Grav'
    },
    externals: {
        jquery: 'jQuery',
        'grav-config': 'GravAdmin'
    },
    module: {
        rules: [
            { test: /\.json$/, loader: 'json' },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, options: { presets: ['@babel/preset-env', 'stage-3'] } }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                defaultVendors: {
                    filename: 'vendor.js',
                }
            }
        },
    },
    plugins: [new ESLintPlugin({})]
};
