var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var tape = require('gulp-tape');
var istanbul = require('gulp-istanbul');

gulp.task('clean', function() {
	return gulp.src(['./lib/scribbletune.js', './lib/ext/*.js', './test/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jscs());
});

gulp.task('pre-coverage', function() {
	return gulp.src(['lib/*.js', 'index.js'])
		.pipe(istanbul())
		// This overwrites `require` so it returns covered files
		.pipe(istanbul.hookRequire());
});

gulp.task('test-with-coverage', ['pre-coverage'], function() {
	return gulp.src('test/*.js')
		.pipe(tape())
		.pipe(istanbul.writeReports());
});

gulp.task('default', ['clean', 'test-with-coverage']);
