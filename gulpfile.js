var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src",
        browser: "chrome"
    });

    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
     gulp.watch("src/*.js").on('change', browserSync.reload);
});


//move css to inline



// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/scss/*.scss")
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(autoprefixer())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);