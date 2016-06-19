'use strict';
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var compass = require('gulp-compass');
var cleanCss = require('gulp-clean-css');

gulp.task('lint', function() {
    gulp.src('./app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('minify', function(){
    gulp.src(['./app/**/*.module.js', './app/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));

    // gulp.src('./app/**/*.js')
    //     .pipe(sourcemaps.init())
    //     .pipe(concat('all.js'))
    //     .pipe(gulp.dest('./dist'))
    //     .pipe(rename('all.min.js'))
    //     .pipe(ngAnnotate())
    //     .pipe(uglify())
    //     .pipe(sourcemaps.write())
    //     .pipe(gulp.dest('./dist'));
});

gulp.task('compass', function() {
    gulp.src('./app/**/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'stylesheets',
            sass: 'app'
        }));
});

gulp.task('css', function () {
    gulp.src('./stylesheets/application.css')
        .pipe(cleanCss())
        .pipe(rename("all.min.css"))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', function(){
    gulp.run('lint', 'minify', 'compass', 'css');
});

gulp.task('watch', function () {
    gulp.run('build');
    // JS watcher
    gulp.watch("./app/**/*.js", function(){
        gulp.run('lint', 'minify');
    });

    // Compass watcher
    gulp.watch("./app/**/*.scss", function(){
        gulp.run('compass');
    });

    // Css watcher
    gulp.watch('./stylesheets/application.css', function(){
        gulp.run('css');
    });
});