var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

gulp.task('clean', function() {
	return gulp.src(['./lib/scribbletune.js', './lib/ext/*.js', './test/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jscs());
});

gulp.task('pre-coverage', function() {
	return gulp.src('lib/*.js')
		.pipe(istanbul())
		// This overwrites `require` so it returns covered files
		.pipe(istanbul.hookRequire());
});

gulp.task('coverage', ['pre-coverage'], function() {
	gulp.src('index.js')
		.pipe(mocha({reporter: 'spec'}))
		.pipe(istanbul.writeReports());
});

gulp.task('default', ['clean', 'coverage']);
