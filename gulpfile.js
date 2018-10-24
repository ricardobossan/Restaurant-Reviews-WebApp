const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');

// Generates documentation on the `doc` directory
gulp.task('jsdoc', function (cb) {
	gulp.src(['./README.md', './js/*.js'], {read: false})
		.pipe(jsdoc(cb));
});