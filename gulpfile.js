var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	jscs = require('gulp-jscs'),
	mocha = require('gulp-mocha');

gulp.task('clean', function() {
	return gulp.src(['./lib/scribbletune.js', './lib/ext/*.js', './test/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jscs());
});

gulp.task('test', function() {
	return gulp.src('./test/*.js', {read: false})
		.pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['clean', 'test']);
