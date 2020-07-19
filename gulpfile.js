// Include plugins ===================================================
var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync");
var cssmin = require("gulp-cssmin");
var htmlmin = require("gulp-htmlmin");
var pump = require("pump");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var slim = require("gulp-slim");

// Browser Sync ======================================================
gulp.task("sync", function () {
	return browserSync({
		server: "",
	});
});

// Refresh ===========================================================
gulp.task("refresh", function () {
	return gulp.src("*").pipe(
		browserSync.reload({
			stream: true,
		})
	);
});

// Compile HTML ======================================================
gulp.task("html", function () {
	return gulp
		.src("src/*.slim")
		.pipe(
			slim({
				pretty: true,
			})
		)
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				removeComments: true,
				minifyCSS: true,
				minifyJS: true,
			})
		)
		.pipe(gulp.dest(""))
		.pipe(
			browserSync.reload({
				stream: true,
			})
		);
});

// JS ================================================================
// gulp.task("js", function (cb) {
// 	pump([gulp.src("src/*.js"), uglify(), gulp.dest("")], cb)
// 		.pipe(gulp.dest(""))
// 		.pipe(
// 			browserSync.reload({
// 				stream: true,
// 			})
// 		);
// });

// Compile CSS =======================================================
gulp.task("scss", function () {
	return gulp
		.src("src/*.scss")
		.pipe(sass())
		.on("error", sass.logError)
		.pipe(
			autoprefixer({
				browsers: ["last 2 versions"],
				cascade: false,
			})
		)
		.pipe(cssmin())
		.pipe(
			rename(function (path) {
				path.basename += ".min";
				path.extname = ".css";
			})
		)
		.pipe(gulp.dest(""))
		.pipe(
			browserSync.reload({
				stream: true,
			})
		);
});

// Compile CSS =======================================================
gulp.task("css", function () {
	return gulp
		.src("src/*.css")
		.pipe(gulp.dest(""))
		.pipe(cssmin())
		.pipe(
			rename(function (path) {
				path.basename += ".min";
				path.extname = ".css";
			})
		)
		.pipe(gulp.dest(""))
		.pipe(
			browserSync.reload({
				stream: true,
			})
		);
});

// Watch Files For Changes ===========================================
gulp.task("watch", ["sync"], function () {
	gulp.watch("src/*.slim", ["html"]);
	gulp.watch("src/*.js", ["js"]);
	gulp.watch("src/*.scss", ["scss"]);
	gulp.watch("src/*.css", ["css"]);
});

// Default Task ======================================================
gulp.task("default", ["watch"]);
