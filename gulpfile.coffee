# config
path =
  css: "css/",
  scss: "css/"

# require
gulp = require('gulp');
$ = require('gulp-load-plugins')();
livereload = require('gulp-livereload');

# tasks
gulp.task 'sass', ->
  gulp.src "#{path.scss}*.scss"
  .pipe $.sass({
    onError: console.error.bind(console, 'SASS Error:')
    })
  .pipe $.autoprefixer
    browsers: ["Firefox > 20","iOS 7", "last 2 Chrome versions", "defaults", "ie > 8"  ]

  .pipe gulp.dest path.css
  .pipe $.size()

gulp.task 'default', ->
  gulp.watch "#{path.scss}/**/*.scss", ['sass']
