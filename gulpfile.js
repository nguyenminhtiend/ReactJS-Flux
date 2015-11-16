"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');

var config = {
    port: 8888,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        jsx: './src/**/*.jsx',
        css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'node_modules/font-awesome/css/font-awesome.min.css',
            'node_modules/react-datepicker/dist/react-datepicker.min.css',
			'./src/css/custom.css'
        ],
        fonts: 'node_modules/font-awesome/fonts/*.{otf,eot,svg,ttf,woff,woff2}',
        mainJs: './src/main.js',
        dist: './dist'
    }
};

gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

gulp.task('html', function () {
    gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('js', function () {
    browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
    gulp.src(config.paths.fonts)
		.pipe(gulp.dest(config.paths.dist + '/fonts'));
});

gulp.task('lint', function () {
    return gulp.src(config.paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js']);
    gulp.watch(config.paths.jsx, ['js']);
    gulp.watch(config.paths.css , ['css']);
});

gulp.task('default', ['html', 'js', 'css', 'lint', 'open', 'watch']);