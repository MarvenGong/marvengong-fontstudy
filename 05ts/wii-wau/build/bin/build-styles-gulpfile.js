'use strict';

const path = require('path');
const { series, src, dest } = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

const cwd = path.resolve('../../');

function compile () {
  return src('packages/styles/index.less', {
    cwd
  })
    .pipe(
      less({
        javascriptEnabled: true
      })
    )
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(rename('wau.css'))
    .pipe(dest('../../dist'));
}

exports.build = series(compile);
