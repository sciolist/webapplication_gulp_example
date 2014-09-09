var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var less = require('gulp-less');
var Path = require('path');
var fs = require('fs');

gulp.task('scripts', function () {
    var dest = './Content/js/index.out.js';
    var b = browserify('./Content/js/index.js', {
        extensions: ['.js']
    });

    b.bundle()
        .on('error', createErrorMessage)
        .pipe(source(Path.basename(dest)))
        .pipe(gulp.dest(Path.dirname(dest)));

    function createErrorMessage(ex) {
        // dump out error to the result file, gets displayed in browser.
        var msg = (ex.stack||ex.message).toString().replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, "\\\n<br>");
        var data = "document.body.innerHTML=(\"<pre>Gulp could not build javascript file:\\n<br>" + msg + "</pre>\");";
        fs.writeFileSync(dest, data);
    }
});

gulp.task('styles', function () {
    var dest = './Content/css/index.css';
    gulp.src(['./Content/css/index.less'])
        .pipe(less().on('error', createErrorMessage))
        .pipe(gulp.dest('./Content/css'));

    function createErrorMessage(ex) {
        // dump out error to the result file, gets displayed in browser.
        var msg = (ex.stack||ex.message).toString().replace(/\\/g, '\\\\').replace(/\n/g, '\\A\n').replace(/"/g, '\\"');
        var data = "html:before { white-space: pre; font-size: 14px; background: #EEE; display: block; padding: 16px; content: \"Gulp could not build css file:\\A\n" + msg + "\"; }\nhtml > * { display: none !important; }";
        fs.writeFileSync(dest, data);
    }
});

gulp.task('rebuild', ['scripts', 'styles']);
