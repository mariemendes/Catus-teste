const gulp = require('gulp');
const exec = require('gulp-exec');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const newer = require('gulp-newer');
const notify = require('gulp-notify');

// Paths
const paths = {
  assets: {
    src: 'src/assets/**/*.{jpg,jpeg,png,gif,svg}',
    dest: 'dist/assets',
  },
  styles: {
    src: 'src/scss/style.scss',
    dest: 'dist/css',
  },
  scripts: {
    src: 'src/js/*.js',
    dest: 'dist/js',
  },
  html: {
    src: 'src/*.html',
    dest: 'dist',
  },
};

// Error handling function
function handleError(err) {
  console.error(err.toString());
  notify.onError({
    title: 'Gulp Task Error',
    message: 'Check the console.',
  })(err);
  this.emit('end');
}

// Task to process assets
gulp.task('assets', function () {
  return gulp
    .src(paths.assets.src)
    .pipe(newer(paths.assets.dest))
    .on('error', handleError)
    .pipe(gulp.dest(paths.assets.dest));
});

// Task to compile Sass to CSS
gulp.task('styles', function () {
  return gulp
    .src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .on('error', handleError)
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest));
});

// Task to copile JavaScript
gulp.task('scripts', function () {
  return gulp
    .src(paths.scripts.src)
    .pipe(newer(paths.scripts.dest))
    .on('error', handleError)
    .pipe(concat('script.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .on('error', handleError)
    .pipe(gulp.dest(paths.scripts.dest));
});

// Task to move HTML files
gulp.task('html', function () {
  return gulp
    .src(paths.html.src)
    .pipe(newer(paths.html.dest))
    .on('error', handleError)
    .pipe(gulp.dest(paths.html.dest));
});

// Watch task
gulp.task('watch', function () {
  gulp.watch(paths.styles.src, gulp.series('styles'));
  gulp.watch(paths.scripts.src, gulp.series('scripts'));
  gulp.watch(paths.html.src, gulp.series('html'));
  gulp.watch(paths.assets.src, gulp.series('assets'));
});
//Iniciate live server
gulp.task('serve', function () {
  return gulp.src('dist').pipe(exec('live-server --port=5501'));
});

// Default task
gulp.task(
  'default',
  gulp.series('styles', 'scripts', 'html', 'assets', 'watch', 'serve'),
);
