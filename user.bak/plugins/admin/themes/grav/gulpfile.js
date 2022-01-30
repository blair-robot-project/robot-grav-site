'use strict';

const gulp = require('gulp');
const util = require('util');
const path = require('path');
const gutil = require('gulp-util');
const immutable = require('immutable');
const merge = require('merge-stream');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const plugins = {
    'Promise': 'imports?this=>global!exports?global.Promise!babel-polyfill',
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
};
const base = immutable.fromJS(require('./webpack.conf.js'));
const devOptions = base.mergeDeep({
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"development"' }
        }),
        new webpack.ProvidePlugin(plugins)
        // new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js", Infinity)
    ],
    output: {
        filename: 'admin.js'
    }
});
const prodOptions = base.mergeDeep({
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"production"' }
        }),
        new UglifyJsPlugin({
            sourceMap: true
        }),
        new webpack.ProvidePlugin(plugins)
        // new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.min.js", Infinity)
    ],
    output: {
        filename: 'admin.min.js'
    }
});

var compileJS = function (watch) {
    // var devOpts = devOptions.set('watch', watch);
    var prodOpts = prodOptions.set('watch', watch);

    var prod = gulp.src('app/main.js')
        .pipe(webpackStream(prodOpts.toJS()))
        .pipe(gulp.dest('js/'));

    /*var dev = gulp.src('app/main.js')
        .pipe(gulpWebpack(devOpts.toJS()))
        .pipe(gulp.dest('js/'));*/

    // return merge(prod, dev);
    return prod;
};

var compileCSS = function (event) {
    return gulp.src('./scss/**/*.scss')
        .on('end', function () {
            // console.log(util.inspect(event));
            if (event && event.path) {
                gutil.log(gutil.colors.green('√'), 'Saved change for "' + event.path.replace(__dirname, '') + '"');
            }
        })
        .on('error', gutil.log)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css-compiled'));
};

gulp.task('js', () => compileJS(false));

gulp.task('css', compileCSS);

gulp.task('watch', gulp.series(
    () => compileJS(true),
    () => gulp.watch('./scss/**/*.scss', compileCSS)
));

gulp.task('watch-js', function () {
    return compileJS(true);
});

gulp.task('watch-css', gulp.series(
    compileCSS,
    () => gulp.watch('./scss/**/*.scss', compileCSS)
));

gulp.task('all', gulp.series('css', 'js'));
gulp.task('default', gulp.series('all'));
