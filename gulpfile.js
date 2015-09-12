var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

gulp.task('clean', function() {
	return gulp.src(['./lib/scribbletune.js', './lib/ext/*.js', './test/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jscs());
});

gulp.task('default', ['clean']);
