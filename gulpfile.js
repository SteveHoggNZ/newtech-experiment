var gulp = require('gulp');

var config = require('./gulp/gulp.config.js');

gulp.task('default', function() {

});

gulp.task('build', function(callback) {
   runSequence('clean',callback)
});

gulp.task('clean', function() {
   return del([config.build_dir], {force: true});
});