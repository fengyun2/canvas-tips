/*
 * @Author: fengyun2
 * @Date:   2016-07-26 09:38:36
 * @Last Modified by:   fengyun2
 * @Last Modified time: 2016-07-26 17:56:02
 */

'use strict';

const gulp = require('gulp');
require('babel-register')

const stylus = require('gulp-stylus');
const minifyCSS = require('gulp-minify-css');
const nib = require('nib');
const clean = require('gulp-clean');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
// const jshint = require('gulp-jshint');
const path = require('path');
const babel = require('gulp-babel');

const buildSrc = path.join(__dirname, 'dist'),
  jsSrc = path.join(__dirname, 'src/**/*.js'),
  cssSrc = path.join(__dirname, 'src/**/*.css'),
  htmlSrc = path.join(__dirname, 'src/**/*.html');

// 目标目录清理
gulp.task('clean', function() {
  return gulp.src([buildSrc], { read: false })
    .pipe(clean());
});

// css
gulp.task('css', function() {
  gulp.src([cssSrc])
    // .pipe(minifyCSS({ compatibility: 'ie8' }))
    .pipe(autoprefixer({
      browsers: ['>0.001%', 'last 10 versions'],
      flexbox: true
    }))
    .pipe(gulp.dest(buildSrc));
});

// html
gulp.task('html', function() {
  gulp.src([htmlSrc])
  .pipe(gulp.dest(buildSrc));
});
// js
gulp.task('js', function() {
  gulp.src([jsSrc])
  .pipe(babel())
  .pipe(gulp.dest(buildSrc));
});

gulp.task('default', ['js', 'css', 'html', 'watch']);

//监听任务
gulp.task('watch', function() {
  gulp.watch(cssSrc, ['css']);
  gulp.watch(jsSrc, ['js']);
  gulp.watch(htmlSrc, ['html']);
});
