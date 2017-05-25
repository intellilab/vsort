const path = require('path');
const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');
const rollup = require('gulp-rollup');
const minifyHtml = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const assetsInjector = require('gulp-assets-injector')();

const DIST = 'dist';
const IS_PROD = process.env.NODE_ENV === 'production';
const rollupOptions = {
  format: 'iife',
  plugins: [
    require('rollup-plugin-babel')({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      presets: [
        [
          'env',
          {
            modules: false,
            targets: {
              browsers: ['chrome >= 58'],
            },
          },
        ],
      ].filter(Boolean),
      plugins: [['transform-runtime', { polyfill: false }]],
      comments: false,
    }),
    require('rollup-plugin-node-resolve')(),
    require('rollup-plugin-commonjs')({
      include: 'node_modules/**',
    }),
    IS_PROD && require('rollup-plugin-babili')(),
  ].filter(Boolean),
  allowRealFiles: true,
};

// INLINE mode will inline all CSS and JavaScript, you should use it when
// CSS and JavaScript sizes are both small.
// Known issue: INLINE mode will be broken if script has string `</script>` in it.
const INLINE = IS_PROD;

gulp.task('clean', () => del(DIST));

gulp.task('css', () => {
  let stream = gulp.src('src/style.css', {base: 'src'})
  .pipe(plumber(logError))
  .pipe(postcss([
    precss(),
    autoprefixer(),
    IS_PROD && cssnano(),
  ].filter(Boolean)))
  .pipe(assetsInjector.collect());
  if (!INLINE) stream = stream
  .pipe(gulp.dest(DIST));
  if (!IS_PROD) stream = stream
  .pipe(browserSync.stream());
  return stream;
});

gulp.task('js', () => {
  let stream = gulp.src('src/app.js', {base: 'src'});
  stream = stream.pipe(rollup(Object.assign({
    entry: 'src/app.js',
  }, rollupOptions)));
  stream = stream
  .pipe(assetsInjector.collect());
  if (!INLINE) stream = stream
  .pipe(gulp.dest(DIST));
  return stream;
});

gulp.task('html', ['css', 'js'], () => {
  let stream = gulp.src('src/index.html', {base: 'src'});
  if (IS_PROD) stream = stream
  .pipe(minifyHtml({
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeAttributeQuotes: true,
  }));
  return stream
  .pipe(assetsInjector.inject({link: !INLINE}))
  .pipe(gulp.dest(DIST));
});

gulp.task('copy', () => {
  return gulp.src([
        'src/assets/**',
  ], {base: 'src'})
  .pipe(gulp.dest(DIST));
});

gulp.task('default', ['html', 'copy']);

gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('watch-js', ['js'], reload);
gulp.task('watch-html', ['html'], reload);
gulp.task('watch', ['default'], () => {
  gulp.watch('src/**/*.css', ['css']);
  gulp.watch('src/**/*.js', ['watch-js']);
  gulp.watch('src/**/*.html', ['watch-html']);
});

gulp.task('browser-sync', ['watch'], () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: DIST,
    },
  });
});

function logError(err) {
  gutil.log(err.toString());
  return this.emit('end');
}
function reload(done) {
  browserSync.reload();
  done && done();
}
