var gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    eventStream = require('event-stream'),
    inject = require('gulp-inject');

var config = require('./gulp/gulp.config.js');

gulp.task('default', function() {
    runSequence('build');
});

gulp.task('build', function(callback) {
   runSequence('clean', 'copy-build', 'copy-injected-index', callback);
});

gulp.task('copy-build', ['copy-app-html', 'copy-app-js', 'copy-assets', 'copy-vendor-js']);

gulp.task('copy-injected-index', function() {
   return gulp.src('./src/**/*.html')
       .pipe(inject(eventStream.merge(gulp.src(config.app_files.tpl_src), gulp.src(config.app_files.vendor_src)),
           {ignorePath: 'build'}))
       .pipe(gulp.dest(config.build_dir));
});

gulp.task('copy-app-html', function() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest(config.build_dir));
});

gulp.task('copy-app-js', function() {
    return gulp.src('./src/**/*.js')
        .pipe(gulp.dest(config.build_dir));
});

gulp.task('copy-assets', function() {
    return gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./build/assets'));
});

gulp.task('copy-vendor-js', function() {
    return gulp.src('./vendor/**/*.js')
        .pipe(gulp.dest('./build/vendor'));
});

gulp.task('clean', function() {
   return del([config.build_dir], {force: true});
});