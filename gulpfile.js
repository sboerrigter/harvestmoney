'use strict';

/**
 * Require dependencies
 */
var gulp = require('gulp'),
    cache = require('gulp-cached'),
    beep = require('beepbeep'),
    plumber = require('gulp-plumber'),
    lint = require('gulp-scss-lint'),
    phpcs = require('gulp-phpcs');

/**
 * Setup files to watch
 */
var files = [
  '**/*.php',
  '**/*.scss',
  '!node_modules/**/*.*',
  '!vendor/**/*.*'
];

/**
 * Error handling
 */
var gulp_src = gulp.src;

gulp.src = function() {
  return gulp_src.apply(gulp, arguments)

  .pipe(plumber(function(error) {
    beep();
  }));
};

/**
 * PHP CodeSniffer
 */
gulp.task('phpcs', function() {
  return gulp.src(files)

  // Use cache to filter out unmodified files
  .pipe(cache('phpcs'))

  // Sniff code
  .pipe(phpcs({
    bin: '~/.composer/vendor/bin/phpcs',
    standard: 'PSR2',
    warningSeverity: 0
  }))

  // Log errors and fail afterwards
  .pipe(phpcs.reporter('log'))
  .pipe(phpcs.reporter('fail'));
});

/**
 * SCSS lint
 */
gulp.task('lint', function() {
  return gulp.src(files)

  // Use cache to filter out unmodified files
  .pipe(cache('lint'))

  // Lint
  .pipe(lint())

  // Make reporter fail task on error
  .pipe(lint.failReporter());
});


/**
 * Watch
 */
gulp.task('default', function() {
  gulp.watch(files, ['lint']);
  gulp.watch(files, ['phpcs']);
});
