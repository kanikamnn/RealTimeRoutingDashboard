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
	merge = require('merge-stream')
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

  // Using Wildcards for excluding partial scss files...
  // http://stackoverflow.com/questions/27689351/how-can-i-use-a-glob-to-ignore-files-that-start-with-an-underscore
	return gulp.src("assets/scss/**/[^_]*.scss")
			.pipe(plumber(plumberOptions))
			.pipe(sourcemaps.init())
			.pipe(scss())
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

gulp.task('combined-js', function() {
	// Following are the folder names for javascript files for each view in their seperate folders...
	var js = ['index'];
	var jsx = ['home'];
	const babelOptions = {
		presets: ["es2015", "react"]
	}

 	var tasks = js.map(function(el){
  		return gulp.src( 'assets/js/' + el + '/*.js')
			      .pipe(plumber(plumberOptions))
				    .pipe(sourcemaps.init())
				    .pipe(babel(babelOptions))
				    .pipe(concat( el + ".js" ))
				    .pipe(sourcemaps.write("."))
				    .pipe(gulp.dest("public/js/"))
				    .pipe(browserSync.stream({match: '**/*.js'}))
  });

 	// Right now I don't have any jsx to compile...
   Array.prototype.push.apply(tasks, jsx.map(function(el) {
   	return gulp.src( 'assets/jsx/' + el + '/*.jsx')
		 	      .pipe(plumber(plumberOptions))
		 		    .pipe(sourcemaps.init())
				    .pipe(babel(babelOptions))
		 		    .pipe(concat( el + ".js" ))
				    .pipe(sourcemaps.write("."))
		 		    .pipe(gulp.dest("public/js/"))
		 		    .pipe(browserSync.stream({match: '**/*.js'}))
   }));

  // Found this - http://stackoverflow.com/questions/26784094/can-i-use-a-gulp-task-with-multiple-sources-and-multiple-destinations
  return merge(tasks);

})

// BrowserSync: https://browsersync.io/docs/gulp
// Use {server: for static pages} & {proxy: for proxying your localhost page}
gulp.task('browsersync', function() {
	const syncOptions = { ui: { port: 3002, weinre: { port: 3003 } }, proxy: 'http://localhost:3001/',
												open: false, online: false, notify: false, }
  browserSync.init(syncOptions);
});

gulp.task('serve', ['scss', 'combined-js', 'browsersync'], function() {
	gulp.watch('assets/scss/**/*.scss', ['scss']);
	gulp.watch('assets/**/*.{js,jsx}', ['combined-js']);
	gulp.watch("views/**/*.hbs").on('change', browserSync.reload);
});

gulp.task('build', ['scss', 'combined-js']);
gulp.task('default', ["serve"]);