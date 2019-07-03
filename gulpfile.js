'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const prefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const cssmin = require('gulp-minify-css');
const imagemin = require('gulp-imagemin');
const pngcrush = require("imagemin-pngcrush");
const browserSync = require("browser-sync");
const clean = require('gulp-clean');
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const fs = require('fs');

const srcPath = './src/';
const buildPath = './docs/';

const path = {
  build: {
    html: buildPath,
    js: buildPath + 'js/',
    css: buildPath + 'css/',
    img: buildPath + 'imgs/',
    fonts: buildPath + 'fonts/',
    files: buildPath + 'files/'
  },
  src: {
    html: srcPath + 'html/pages/*.pug',
    js: srcPath + 'js/*.js',
    js_libs: srcPath + 'js/libs/**/*.js',
    style: srcPath + 'css/styles.scss',
    img: srcPath + 'imgs/**/*.*',
    fonts: srcPath + 'fonts/**/*.*',
    files: srcPath + 'files/**/*.*'
  },
  watch: {
    html: srcPath + 'html/**/*.pug',
    js: srcPath + 'js/**/*.js',
    style: srcPath + 'css/**/*.scss',
    img: srcPath + 'imgs/**/*.*',
    fonts: srcPath + 'fonts/**/*.*',
    files: srcPath + 'files/**/*.*'
  }
};

const config = {
  server: {
    baseDir: buildPath
  },
  // tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "Luzins"
};

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('html:build', function(cb) {
  gulp.src(path.src.html)
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(pug())
    .pipe(gulp.dest(path.build.html))
    .on('end', function() {
      cb();
    })
    .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
  gulp.src([path.src.js_libs, path.src.js])
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
  gulp.src(path.src.style)
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: ['src/css/'],
      outputStyle: 'compressed',
      sourceMap: true,
      errLogToConsole: true
    }))
    .pipe(prefixer('last 2 version', 'ie 10'))
    .pipe(cssmin())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});


gulp.task('image:build', function () {
  gulp.src(path.src.img)
    .pipe(imagemin({
        interlaced: true,
        progressive: true,
        // optimizationLevel: 5,
        svgoPlugins: [
          {
              removeViewBox: false
          }
        ],
        use: [pngcrush()]
    }))
    .pipe(gulp.dest(path.build.img));
    // .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

gulp.task('files:build', function() {
  gulp.src(path.src.files)
    .pipe(gulp.dest(path.build.files))
});

gulp.task('clean', function () {  
  gulp.src(path.build.html, {read: false})
    .pipe(clean());
});

gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'image:build',
  'fonts:build',
  'files:build'
]);

gulp.task('watch', function(){
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.style], function(event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
      gulp.start('image:build');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
  watch([path.watch.files], function(event, cb) {
    gulp.start('files:build');
  });
});

gulp.task('default', ['build', 'webserver', 'watch']);
gulp.task('production', ['build']);
