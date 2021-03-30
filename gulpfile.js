/*eslint-disable */

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore")
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var concat = require("gulp-concat");
var babel = require("gulp-babel");
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
var gulpAvif = require('gulp-avif');

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(rename("styles.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/js/vendors/"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css", "concatcss", "cssminify"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/*", gulp.series("scripts", "babel"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.jpegtran({ progressive: true }),
    ]))

    .pipe(gulp.dest("source/img"));

});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img"));
});

gulp.task("avif", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
      .pipe(gulpAvif())
      .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/**/*.svg")
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("sprite_auto.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("scripts", function () {
  return gulp.src("source/js/vendors/*.js")
    .pipe(concat("vendors.js"))
    .pipe(gulp.dest("build/js"));
});

gulp.task("babel", function () {
  return gulp.src("source/js/main.js")
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(gulp.dest("build/js"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/*.js",
    "source//*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("concatcss", function () {
  return gulp.src([
    "source/js/vendors/*.css"
  ])
    .pipe(concatCss("style.css"))
    .pipe(gulp.dest("build/css"))
});

gulp.task("cssminify", function () {
  return gulp.src([
    "source/js/vendors/*.css"
  ])
    .pipe(concatCss("style.min.css"))
    .pipe(csso())
    .pipe(gulp.dest("build/css"))
});

gulp.task("compress", function () {
  return gulp.src("build/js/vendors.js")
    .pipe(uglify())
    .pipe(gulp.dest("build/js"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series("clean", "copy", "css", "scripts", "babel", "sprite", "html", "concatcss","cssminify", "compress"));
gulp.task("start", gulp.series("build", "server"));
