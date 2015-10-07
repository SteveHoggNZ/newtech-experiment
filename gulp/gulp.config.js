module.exports = {
    build_dir: 'build',
    app_files: {
        html: ['src/**/*.html'],
        js: ['src/**/*.js'],
        tpl_src: ['./build/app/**/*.js',
            './build/assets/css/**/*.css'],
        vendor_src: ['rx.min.js',
            'react-with-addons.min.js']
                .map(function(val) {return "./build/vendor/**/" + val})
    }
};