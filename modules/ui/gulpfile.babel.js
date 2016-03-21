import gulp from "gulp";
import babel from "gulp-babel";
import runSequence from "run-sequence";
import concat from "gulp-concat";
import del from "del";
import Builder from "systemjs-builder";


const paths = {
    'src': './public/app/',
    'vendor': './node_modules/',
    'dist': {
        'server': './public/dist/'
    }
};

//
// Js For Browser
//

//gulp.task('build-js-browser', function () {
//    return browserify({entries: paths.src + 'app.js'})
//        .transform(babelify)
//        .bundle()
//        .pipe(source('app.js'))
//        .pipe(gulp.dest(paths.dist.public))
//        .pipe(rename({suffix: '.min'}))
//        .pipe(streamify(uglify({mangle: false, preserveComments: 'some'})))
//        .pipe(gulp.dest(paths.dist.public))
//});

//
// Js For Server
//

gulp.task('build-js-server-deps', function () {
    return gulp.src([
            paths.vendor + 'react/dist/react.js'
        ])
        .pipe(gulp.dest(paths.dist.server));
});

gulp.task('build-js-server-app', function () {
    return gulp.src([
            paths.src + 'components/*'
        ])
        .pipe(babel({modules: 'ignore'}))
        .pipe(concat('server.js'))
        .pipe(gulp.dest(paths.dist.server));
});

gulp.task('build-js-server', function (cb) {
    runSequence('build-js-server-app', 'build-js-server-deps', cb);
});

gulp.task('build-js-client', function (cb) {
    var builder = new Builder('public', './public/config.js');

    builder
        .buildStatic(paths.src + 'app.js', 'public/dist/client.js', { runtime: false })
        .then(function () {
            console.log('Build complete');
            cb();
        })
        .catch(function (err) {
            console.log('Build error');
            console.log(err);
            cb(err);
        });
});
gulp.task('build-js', function (cb) {
    runSequence('build-js-server', 'build-js-client', cb);
});

// --- Clean all generated files
gulp.task('clean', function () {
    del([
        paths.dist.public + '*',
        paths.dist.server + '*'
    ], {force: true})
});

// --- WATCH
gulp.task('watch', ['clean', 'build-js'], function () {
    gulp.watch(paths.src + '**.js', ['build-js']);
});

// --- DEFAULT
gulp.task('default', ['clean', 'build-js']);
