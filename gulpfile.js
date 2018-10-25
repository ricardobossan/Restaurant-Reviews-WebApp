/**
 * @file gulpefile.js. Task runner for JS.
 * @desc A task runner for JS
 */

/**
 * @desc Require dependencies.
 * @requires
 */
const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const bSync = require('browser-sync');

/**
 * @desc Reloads the browser.
 */
gulp.task('default', () => {
	gulp.watch("js/*.js").on('change', bSync.reload);
	gulp.watch("css/*.css").on('change', bSync.reload);

	bSync.init({
		server: "./",
		port: 8000,
		index: "index.html",
		ui: false
	});
});


/*
 * @desc Generates documentation on the `doc` directory.
 */
gulp.task('jsdoc', (cb) => {
	gulp.src(['./README.md', './js/*.js'], {read: false})
		.pipe(jsdoc(cb));
});