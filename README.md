# Project: Restaurant Review App

## Table of Contents
* [Credits and Acknowledgement](#credits-and-acknowledgement)
* [The App](#the-app)
* [How to Run the App](#how-to-run-the-app)
* [How to Build the App](#how-to-build-the-app)
	* [Node.js and Npm](#Node.js-and-Npm)
	* [Gulp Configuration](#Gulp-Configuration)
	* [Install Eslint Globally](#Install-Eslint-Globally)
	* [Generating Documentation With Jsdoc](#Generating-Documentation-With-Jsdoc)
	* [Running The Build Tool](#Running-The-Build-Tool)
* [Accessbility](#accessbility)

## Credits and Acknowledgement

I give thanks to the following:

 * jonschlinkert, for [table of contents markdown code][13];
 * Udacity, for providing [various resources][14] to help complete this project, as well as all colaborators mentionedon the resources [link][14], specially Mathew Cranford[¹][15][²][16][³][17][⁴][18];

## The App

Click or Tab your way through the restaurant reviews, either manually or filtering the results by neighborhoods and cuisines.

## How to Run the App

On Nodejs CLI, `CD` into the root directory for this project and run the ``gulp`` command.

## How to Build the App

#### Node.js and Npm

Install [Node.js][1].

Install the latest version of [npm][2] via command line:

```
$ npm install npm@latest -g
```

To initialize a node.js project, run this at the top-level directory of your project:

```
$ npm init
```
Answer the questions that pop up on the terminal, to create a basic `package.json` file.

Install the task runner [Gulp.js][3] globally:

```
$ npm install --global gulp-cli
```

Install [Browsersync][10] globally:

```
$ npm install -g browser-sync
```

 Install locally the npm packages I'm going to use for this project (including the Gulp package), in your devDependencies:

* [gulp][4]
* [browsersync][5] (to create a server and reload the browser automaticaly)
* [jasmine][6] (tester)
* [gulp-jsdoc3][12] (Generates Documentation)

```
$ npm --install --save-dev gulp browser-sync jasmine
```

#### Gulp Configuration

Create a `gulpfile.js` at the top level of your project directory, to require packages and configure tasks.

Open the `gulpfile.js` in your IDE.

Require the Gulp and Browsersync packages.

```
const gulp = require('gulp');
const bSrc = require('browser-sync').create();
const bDocumentation = require('browser-sync').create();
const jsdoc = require('gulp-jsdoc3');
```

Then set it's default task to watch the js files in the `src` directory:

Create the `default` task, with servers for the the `index.html`, and the `/docs/gen/index.html` files, and creates the `jsdoc` task, for generating documentation:

```
/**
 * @file gulpefile.js. Task runner for JS.
 * @desc A task runner for JS
 */

/**
 * Requires the task runner's dependencies.
 * @requires
 */
const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const bSync = require('browser-sync').create();
const bSyncDoc = require('browser-sync').create();

/**
 * Reloads the browser, upon saving changes in the watched files.
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
 * Generates documentation on the `doc` directory.
 */
gulp.task('jsdoc', (cb) => {
	gulp.src(['./README.md', './js/*.js'], {read: false})
		.pipe(jsdoc(cb));
});

/*
 * Updates full documentation GUI, initiates it's server and reloads it on the browser.
 */
gulp.task('jsdoc-serve', () => {
	gulp.watch("js/*.js", ["jsdoc"]).on('change', bSyncDoc.reload);
	bSyncDoc.init({
		server: "./docs/gen",
		port: 8080,
		index: "index.html",
		ui: false
	});	
})
```

If you want to creat a `dist` task, for copying all src files to a `dist` directory upon project completion:

```
// copies all files from the `src` directory, as well as the README.md file, to a `dist` folder
gulp.task('dist', function() {
	gulp.src(['./src/**/*','./*.md'])
		.pipe(gulp.dest('./dist'));
});

```

If you want to use SASS:

Run on terminal:

```
$ npm install --save-dev gulp-sass gulp-autoprefixer
```

And modify the `gulpfile.js`

```
const gulp = require('gulp');
const bSrc = require('browser-sync').create();
const bSpecRunner = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer('gulp-autoprefixer');

//If uses sass:
gulp.task('sass', function () {
	return gulp.src('./sass/**/*.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
});
```

Also, modify the first line of the default task, adding it the task 'sass:watch':

```
gulp.task('default', ['sass:watch'], () => {
```

#### Install Eslint Globally

[Eslint][7]

```
$ npm install -g eslint
```

Then move to the `home directory` for your projects and run this command:


```
$ eslint --init
```

Add the enviroments you want to lint. I use this configuration on the section `"env"`, of your `.eslintrc.json` file, on the `home directory`, or on the top level of you project directory

I use this configuration on my `home directory`s `.eslintrc.json` file:

```
{
	"env": {
		"browser": true,
		"es6": true,
		"jasmine": true,
		"amd": true,
		"jquery": true,
		"node": true
    },
}
```

It will create an `eslintrc.json` file, which will contain the configurations for all your projects located at the `home directory`.

If you want to create special eslint configurations for a project, just move to that project's directory run `eslint --init`, to configure a `eslintrc.json` file there.

#### Generating Documentation With Jsdoc

The comments you wish jsdoc to parse should start with `/**`

use [jsdoc tags][11] to display each information within your comments:

```
/**
 * @file This file has tests for the app.js file.
 *
 * @author Ricardo Bossan <ricardobossan@gmail.com>
 */
```

If you wish to generate documentation manually, for each file, the documentation will be placed on an `out` directory, which will be created on the folder where are run the commands:

```
cd <./file-path/
jsdoc <./file-path/file-name>
```

#### Running The Build Tool

Run the `default` task, to automatically reload the browser window when a js file is modified (upon save). On the command line, enter:

```
$ gulp
```

Generate documentation for the project on the `doc` directory, on the top level directory of the project:

```
$ gulp jsdoc
```

## Accessbility

This software was implemented with accessbility in mind, following the [WebAim][19], [WCAG][20] and [ARIA][21] standarts.

<!-- References -->

[1]:https://nodejs.org/en/ "Node.js"
[2]:https://www.npmjs.com/get-npm "Npm"
[3]:https://github.com/gulpjs/gulp/blob/v3.9.1/docs/getting-started.md "Gulp"
[4]:https://www.npmjs.com/package/gulp "Gulp on npm"
[5]:https://www.npmjs.com/package/browser-sync "Browsersync (Local)"
[6]:https://jasmine.github.io/pages/getting_started.html "Jasmine"
[7]:https://www.npmjs.com/package/eslint "Eslint"
[8]:https://docs.npmjs.com/getting-started/updating-local-packages "Update Npm Packages"
[9]:https://github.com/ "Github"
[10]:https://browsersync.io/ "Browsersync (Global)"
[11]:http://usejsdoc.org/index.html#block-tags "Jsdoc Block Tags"
[12]:https://www.npmjs.com/package/gulp-jsdoc3 "gulp-jsdoc"
[13]:https://gist.github.com/jonschlinkert/ac5d8122bfaaa394f896#sub-sub-heading-2/ "TOC in Markdown - jonschlinkert"
[14]:https://www.diigo.com/outliner/fjslyn/Udacity-Restaurant-Reviews-App-(project-%235)?key=zqiopam1yz "Udacity's resources for this project"
[15]:https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-1-map-api/
[16]:https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-2-responsiveness/
[17]:https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-3-accessibility/
[18]:https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-4-service-workers/
[19]:https://webaim.org/standards/wcag/checklist
[20]:https://www.w3.org/TR/WCAG20/
[21]:https://www.w3.org/TR/wai-aria-1.1/