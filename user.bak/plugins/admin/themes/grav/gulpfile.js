'use strict';

const gulp = require('gulp');
const util = require('util');
const path = require('path');
const log = require("fancy-log");
const colors = require("ansi-colors");
const merge = require('merge-stream');
const webpackStream = require('webpack-stream');
const sass = require('gulp-sass')(require("sass"));
const sourcemaps = require('gulp-sourcemaps');


const devOptions = require("./webpack.dev.js");
const prodOptions = require("./webpack.prod.js");

const compileJS = (watch) => () => {
    // var devOpts = devOptions.set('watch', watch);
    prodOptions.watch = watch;

    var prod = gulp.src('app/main.js')
        .pipe(webpackStream(prodOptions))
        .pipe(gulp.dest('js/'));

    /*var dev = gulp.src('app/main.js')
        .pipe(gulpWebpack(devOpts.toJS()))
        .pipe(gulp.dest('js/'));*/

    // return merge(prod, dev);
    return prod;
};

function compileCSS(event) {
    return gulp.src('./scss/**/*.scss')
        .on('end', () => {
            // console.log(util.inspect(event));
            if (event && event.path) {
                log(colors.green('√'), 'Saved change for "' + event.path.replace(__dirname, '') + '"');
            }
        })
        .on('error', log)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css-compiled'));
};

gulp.task('js', compileJS(false));

gulp.task('css', compileCSS);

gulp.task('watch', gulp.series(
    compileJS(true),
    () => gulp.watch('./scss/**/*.scss', compileCSS)
));

gulp.task('watch-js', compileJS(true));

gulp.task('watch-css', gulp.series(
    compileCSS,
    () => gulp.watch('./scss/**/*.scss', compileCSS)
));

gulp.task('all', gulp.parallel('css', 'js'));
gulp.task('default', gulp.series('all'));
