'use strict';

var gulp = require('gulp');
var util = require('util');
var path = require('path');
var immutable = require('immutable');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var sourcemaps = require('gulp-sourcemaps');
var exec = require('child_process').execSync;
// var pwd         = exec('pwd').toString();

var plugins = {},
    base = immutable.fromJS(require('./webpack.conf.js')),
    options = {
        prod: base.mergeDeep({
            devtool: 'source-map',
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': { NODE_ENV: '"production"' }
                }),
                // new webpack.optimize.UglifyJsPlugin({
                //     sourceMap: true,
                //     compress: {
                //         warnings: false
                //     }
                // }),
                new webpack.ProvidePlugin(plugins)
            ],
            output: {
                filename: 'form.min.js'
            }
        })
    };

var compileJS = function (watch) {
    var prodOpts = options.prod.set('watch', watch);

    return gulp.src('app/main.js')
        .pipe(webpackStream(prodOpts.toJS()))
        .pipe(gulp.dest('assets/'));
};

gulp.task('js', function () {
    return compileJS(false);
});

gulp.task('watch', function () {
    return compileJS(true);
});

gulp.task('all', gulp.series('js'));
gulp.task('default', gulp.series('all'));
