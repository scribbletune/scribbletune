var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	jscs = require('gulp-jscs');

gulp.task('scripts', function() {
	return gulp.src(['./lib/scribbletune.js', './lib/ext/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jscs());
});
