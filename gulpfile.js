'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('build', function () {
  return gulp.src('./src/_wrapper.js')
    .pipe($.preprocess())
    .pipe($.rename('cash.js'))
    .pipe($['6to5']())
    .pipe($.size())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify', ['build'], function() {
  return gulp.src(['./dist/cash.js'])
    .pipe($.uglify())
    .pipe($.size())
    .pipe($.rename('cash.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('lint', function() {
  return gulp.src(['src/*.js', '!src/_*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('test', function() {
  return gulp.src('./test/index.html')
    .pipe($.qunit());
});

gulp.task('default', ['build', 'minify', 'lint']);

gulp.task('watch', function() {
  gulp.watch(['src/*.js', 'test/src/*.js'], ['default']);
});
