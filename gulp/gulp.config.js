module.exports = {
    build_dir: 'build',
    app_files: {
        watch_files: ['src/**/*.html', 'src/**/*.js', 'src/assets/sass/**/*.scss'],
        js: ['./src/app/**/*.js'],

        tpl_src: ['./build/app/**/*.js',
            './build/assets/css/**/*.css'],
        vendor_src: ['rx.min.js',
            'react-with-addons.min.js']
                .map(function(val) {return "./build/vendor/**/" + val})
    }
};