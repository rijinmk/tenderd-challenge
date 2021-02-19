const gulp = require("gulp");

// SASS => CSS
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const minifyCSS = require("gulp-minify-css");

// Utilities
const del = require('del'); 

gulp.task('css-css-libraries', function(){
    return gulp.src('./public/styles/*.css')
               .pipe(minifyCSS({processImport: false}))
               .pipe(concat('libraries.styles.min.css'))
               .pipe(gulp.dest('./src'))
});

gulp.task('scss-css-components', function(){
    return gulp.src('./src/**/*.scss')
               .pipe(sass.sync().on('error', sass.logError))
               .pipe(minifyCSS())
               .pipe(concat('component.styles.min.css'))
               .pipe(gulp.dest('./src'))
});

gulp.task('combine-css', function(){
    return gulp.src(['./src/libraries.styles.min.css', './src/component.styles.min.css']) 
               .pipe(concat(`bundle.min.css`))
               .pipe(gulp.dest('./src'))
});

gulp.task('clean-css', function(){
    return del(['./src/libraries.styles.min.css', './src/component.styles.min.css'])
}); 

gulp.task('clean-bundle', function(){
    return del(['./src/bundle.*'])
}); 

gulp.task('watch', function(){
    // Watching CSS
    gulp.watch('./src/**/*.scss', 
    gulp.series('css-css-libraries',
                'scss-css-components',
                'clean-bundle',
                'combine-css',
                'clean-css')); 
});  
