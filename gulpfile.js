var gulp = require('gulp'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    path = require('path'),
    runSequence = require('run-sequence'),
    streamSeries = require('stream-series'),
    minifycss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    inject = require('gulp-inject');

var config = require('./gulp/gulp.config.js');

gulp.task('default', function() {
    runSequence('build', 'watch');
});

gulp.task('build', function(callback) {
   runSequence('clean', 'compile-sass', 'copy-build', 'copy-injected-index', callback);
});

gulp.task('copy-build', ['copy-app-html', 'copy-app-js', 'copy-assets', 'copy-vendor-js']);

gulp.task('copy-injected-index', function() {
   return gulp.src('./src/**/*.html')
       .pipe(inject(streamSeries(gulp.src(config.app_files.vendor_src), gulp.src(config.app_files.tpl_src)),
           {ignorePath: 'build'}))
       .pipe(gulp.dest(config.build_dir))
       .pipe(browserSync.stream());
});

gulp.task('copy-app-html', function() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest(config.build_dir));
});

gulp.task('copy-app-js', function() {
    return gulp.src('./src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest(config.build_dir));
});

gulp.task('copy-assets', function() {
    return gulp.src(['./src/assets/**/*', '!./src/assets/sass{,/**}'])
        .pipe(gulp.dest('./build/assets'));
});

gulp.task('copy-vendor-js', function() {
    return gulp.src('./vendor/**/*.js')
        .pipe(gulp.dest('./build/vendor'));
});

gulp.task('compile-sass', function() {
    return gulp.src('./src/assets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifycss())
        .pipe(gulp.dest('./src/assets/css'));
});

gulp.task('clean', function() {
    return del([config.build_dir], {force: true});
});

gulp.task('watch', function() {
    gulp.watch([config.app_files.watch_files], ['build']);

    browserSync.init({
        browser: "google chrome",
        server: config.build_dir,
        logFileChanges: false
    });
});