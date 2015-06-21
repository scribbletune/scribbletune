var gulp = require('gulp'),
	jshint = require('gulp-jshint');

gulp.task('scripts', function() {
	return gulp.src(['./lib/scribbletune.js', './lib/ext/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});
