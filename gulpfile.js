var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');

gulp.task('reload', function() {
    gulp.src('./html/index.html').pipe(connect.reload());
});

gulp.task('scss', function () {
    gulp.src('./html/scss/*.scss')
        .pipe(sass({
            //outputStyle: 'compressed',
            outputStyle: 'expanded',
            includePaths: ['./html/', './html/scss/']
        })).pipe(gulp.dest('./html/'))
        .pipe(connect.reload());
});

gulp.task('min', function () {
    gulp.src('./html/*.js')
        .pipe(jsmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./html'));
});

gulp.task('watch', function() {
    gulp.watch('./html/**/*.scss', ['scss']);
    gulp.watch('./html/*.html', ['reload']);
    gulp.watch('./html/*.js', ['reload']);
});

gulp.task('server', function() {
    connect.server({
        root: 'html',
        port: 8000,
        livereload: true
    });
});

gulp.task('default', ['scss', 'server', 'watch']);