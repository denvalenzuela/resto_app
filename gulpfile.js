var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var merge = require('merge-stream');

var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var ngAnnotate = require('gulp-ng-annotate');
var order = require("gulp-order");
var templateCache = require('gulp-angular-templatecache');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');

var stylish = require('jshint-stylish');
var pkg = require('./package.json');

var exec = require('child_process').exec;

// Set the banner content
var banner = ['/*!\n',
  ' * <%= pkg.name %> - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2017-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' */\n',
  ''
].join('');

gulp.task('bundle-js', ['lint'], function(){
  var app = gulp.src([
    'resto/static/*.js',
    'resto/static/**/*.js',
    'resto/static/js/app.module.js',
    'resto/static/js/app.config.js',
    '!resto/static/js/app.js',
    '!resto/static/angular/*.min.js',
    '!resto/templates/*.js',
    '!resto/static/*.min.js',
    '!resto/static/assets/**/*.js'
  ])
  .pipe(order([
    'resto/static/js/app.module.js',
    'resto/static/js/app.config.js',
    'resto/static/*.js',
    'resto/static/**/*.js',
    'resto/static/**/**/*.js',
  ], {base: './'}))
  .pipe(concat('app.js', {newLine: ';'}))
  .pipe(ngAnnotate({add: true}))
  .pipe(header(banner, {
    pkg: pkg
  }))
  .pipe(gulp.dest('resto/static/'));

  return app;
});


gulp.task('bundle-templates', function(){
  return gulp.src('resto/static/pages/**/*.html')
    .pipe(templateCache({standalone: true, root:'static/pages/'}))
    .pipe(gulp.dest('resto/static/'));
});

gulp.task('lint', function() {
  var lint =  gulp.src([
      'resto/static/*.js',
      'resto/static/**/*.js',
      'resto/static/**/**/*.js',
      '!resto/static/app.js',
      '!resto/static/*.min.js',
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));

  return lint;
});

gulp.task('minify-js', ['bundle-js'], function() {
  var app = gulp.src([
    'resto/static/app.js'
  ])
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('resto/static/'));

  return app;
});


// Default task
gulp.task('default', ['minify-js']);

gulp.task('runserver', function() {
    var proc = exec('python application.py');
});

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    proxy: "localhost:5000"
  });
});

// Dev task with browserSync
gulp.task('dev', ['default', 'browserSync'], function() {
  gulp.watch(['resto/static/**/*.js', '!resto/static/**/*.min.js', '!resto/static/**/app.js'], ['minify-js', browserSync.reload]);
  // // Reloads the browser whenever HTML or JS files change
  // gulp.watch(['**/*.html'], ['minify-templates', browserSync.reload]);
});
