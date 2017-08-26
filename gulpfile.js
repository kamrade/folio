'use strict';

//var livereload   = require('gulp-livereload');
var gulp         = require('gulp');
var connect      = require('gulp-connect');
var browserify   = require('browserify');
var vinylSource  = require('vinyl-source-stream');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var cleanCSS     = require('gulp-clean-css');
var buffer       = require('vinyl-buffer');
var pug          = require('gulp-pug');
var pump         = require('pump');

const babel      = require('gulp-babel');

gulp.task('pug', function () {
  return gulp.src('src/view/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./dev/'))
    .pipe(connect.reload());
});

gulp.task('pug:dist', function () {
  return gulp.src('src/view/index.pug')
    .pipe(pug({
      pretty: false
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./dist/'));
});

// concat js to one file and put it to dev
gulp.task('js', function(){
  return browserify('src/js/main.js')
    .bundle()
    .pipe(vinylSource('bundle.js'))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./dev'))
    .pipe(connect.reload());
});

// minify concated js files and put it to dist
gulp.task('compressjs', ['js'], function() {
    gulp.src('./dev/bundle.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function(){
  return gulp.src('src/style/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoPrefixer({
      browsers: ['last 2 versions', '> 1%', 'IE 8'],
      cascade: false
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('dev'))
    .pipe(connect.reload());
});

gulp.task('css', ['sass'], function(){
  return gulp.src('dev/style.css')
    .pipe( cleanCSS({compatibility: 'ie8'}) )
    .pipe(gulp.dest('dist'));
});

// server for dev
gulp.task('connect-dev', function() {
  connect.server({
    root: './dev',
    port: 8088,
    livereload: true
  });
});

gulp.task('watch', function(){
  gulp.watch('./src/view/**/*.pug', ['pug']);
  gulp.watch('./src/view/**/*.html', ['pug']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/style/**/*.sass', ['sass']);
  gulp.watch('./src/style/**/*.scss', ['sass']);
});

gulp.task('default', ['connect-dev', 'pug', 'sass', 'js', 'watch']);
gulp.task('dev', ['connect-dev', 'pug', 'sass', 'js', 'watch']);
gulp.task('build', ['pug:dist', 'css', 'compressjs']);
