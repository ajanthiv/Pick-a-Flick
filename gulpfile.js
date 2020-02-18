const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

gulp.task('styles', () => {
	return gulp.src('./dev/styles/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('index.css'))
		.pipe(gulp.dest('./public/styles'))
});

gulp.task('js', () => {
	return browserify('dev/scripts/index.js', {debug: true})
		.transform('babelify', {
			sourceMaps: true,
			presets: ['env','jquery']
		})
		.bundle()
		.on('error',notify.onError({
			message: "Error: <%= error.message %>",
			title: 'Error in JS 💀'
		}))
		.pipe(source('index.js'))
		.pipe(buffer())
		.pipe(gulp.dest('public/scripts'))
		.pipe(reload({stream:true}));
});

gulp.task('bs', () => {
	return browserSync.init({
		server: {
			baseDir: './'
		}
	});
});

gulp.task('default', gulp.series('bs', 'js', 'styles'));