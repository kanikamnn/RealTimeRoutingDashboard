/**
 * Reasearch on gulp-notify
 */

const gulp = require('gulp'),
	babel = require("gulp-babel"),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify')
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	scss = require('gulp-sass'),
	browserSync = require('browser-sync').create();

var onError = function(err) {
  notify.onError({
    title:    "Error",
    message:  "<%= error %>",
  })(err);
  this.emit('end');
};

var plumberOptions = {
  errorHandler: onError,
};

gulp.task('scss', function() {
	const autoprefixerOptions = {
    browsers: ['last 2 versions'],
  };

	return gulp.src("assets/scss/**/*.scss")
			.pipe(plumber(plumberOptions))
			.pipe(sourcemaps.init())
			.pipe(scss())
			// .on('error', logError => {console.log(logError)}) 
			// Not Needed now, as the problem is solved by after v2.0 something, 
			// Check https://github.com/floatdrop/gulp-plumber/issues/32
			.pipe(autoprefixer(autoprefixerOptions))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('public/css'))
			.pipe(browserSync.stream({match: '**/*.css'}))

})

// This task is a very general task, without any use of higher end Pipes
// Only used for Compiling jsx file to js
gulp.task('react', function() {
	const babelOptions = {
		presets: ["es2015", "react"]
	}

	return gulp.src("assets/jsx/**/*.jsx")
			.pipe(plumber(plumberOptions))
	    .pipe(sourcemaps.init())
	    .pipe(babel(babelOptions))
	    .pipe(concat("index.js"))
	    .pipe(sourcemaps.write("."))
	    .pipe(gulp.dest("public/js/"))
	    .pipe(browserSync.stream({match: '**/*.js'}))
});

// BrowserSync: https://browsersync.io/docs/gulp
// Use {server: for static pages} & {proxy: for proxying your localhost page}
gulp.task('browsersync', function() {
	const syncOptions = { ui: { port: 3002, weinre: { port: 3003 } }, proxy: 'http://localhost:3001/',
												open: false, online: false, notify: false, }
  browserSync.init(syncOptions);
});

gulp.task('serve', ['scss', 'react', 'browsersync'], function() {
	gulp.watch('assets/scss/**/*.scss', ['scss']);
	gulp.watch('assets/jsx/**/*.{js,jsx}', ['react']);
	gulp.watch("views/**/*.hbs").on('change', browserSync.reload);
});

gulp.task('build', ['scss', 'react']);
gulp.task('default', ["serve"]);