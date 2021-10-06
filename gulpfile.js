const { src, dest, watch, parallel, series } = require('gulp');
var gulp = require('gulp')
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync');
const { notify } = require('browser-sync');
const svgSprirte = require('gulp-svg-sprite');
const gulpStylelint = require('gulp-stylelint');
const gcmq = require('gulp-group-css-media-queries');
const fileinclude = require('gulp-file-include');

// gulp.task1('fileinclude', function () {
//   gulp.src('app/html/*.html')
//     .pipe(fileinclude({
//       prefix: '@@',
//       basepath: '@file'
//     }))
//     .pipe(gulp.dest('app'));
// });

function include() {
  return src('app/html/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('app/.'));
};


function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    notify: false
  })
}

function lintCss() {
  return src('app/scss/**/*.scss')
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }));
};

function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(gcmq())
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.min.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
    'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
    'node_modules/rateyo/src/jquery.rateyo.js',
    'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(terser())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function images() {
  return src('app/images/**/*.*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/images'))
}


gulp.task('svgSprite', function () {
  return gulp.src('app/images/**.svg')
    .pipe(svgSprirte({
      mode: {
        stack: {
          sprite: "../sprite.svg",
          example: true
        }
      }
    }))
    .pipe(dest('app/images'))
})

function build() {
  return src([
    'app/**/*.html',
    'app/css/style.min.css',
    'app/js/main.min.js'
  ], { base: 'app' })
    .pipe(dest('dist'))
}


function cleanDist() {
  return del('dist')
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch('app/images/*.svg', svgSprirte);
  watch('app/html/*.html', include);
  watch(['app/**/*.html']).on('change', browserSync.reload);
  watch(['app/html/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.images = images;
exports.build = series(cleanDist, images, build);
exports.svgSprirte = svgSprirte;
exports.include = include;
exports.lintCss = lintCss;


exports.default = parallel(include, styles, scripts, browsersync, svgSprirte, watching);