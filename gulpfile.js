const gulp = require('gulp');
const tape = require('gulp-tape');
const istanbul = require('gulp-istanbul');
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
	return gulp.src(['src/*.js','!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('pre-coverage', function() {
	return gulp.src(['src/*.js'])
		.pipe(istanbul())
		.pipe(istanbul.hookRequire());
});

gulp.task('test-with-coverage', ['pre-coverage'], function() {
	return gulp.src('test/*.js')
		.pipe(tape())
		.pipe(istanbul.writeReports());
});

gulp.task('default', ['lint', 'test-with-coverage']);
