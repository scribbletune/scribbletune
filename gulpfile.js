var gulp = require('gulp');
var tape = require('gulp-tape');
var istanbul = require('gulp-istanbul');
var babel = require('gulp-babel');

gulp.task('build', function () {
	return gulp.src(['src/*.js'])
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('lib'))
});

gulp.task('pre-coverage', function() {
	return gulp.src(['lib/*.js'])
		.pipe(istanbul())
		// This overwrites `require` so it returns covered files
		.pipe(istanbul.hookRequire());
});

gulp.task('test-with-coverage', ['pre-coverage'], function() {
	return gulp.src('test/*.js')
		.pipe(tape())
		.pipe(istanbul.writeReports());
});

gulp.task('default', ['test-with-coverage']);