(function(module){

  'use strict';

  var BASE_PORT = 8089;
  var TEST_PORT = 8090;
  var BUILD_DIR = 'build/';
  var CSS_DIR   = 'styles/css/';
  var LESS_DIR  = 'styles/less/'
  var JS_DIR    = 'scripts/';

  module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      // We provide globals to meta so they can be used dynamically in strings for property names.
      meta: {
        build: BUILD_DIR,
        css: CSS_DIR,
        js: JS_DIR
      },
      less: {
        compile: {
          files: {
            'styles/css/app.css': [
              'styles/less/app.less'
            ]
          }
        }
      },
      uglify: {
        options: {
          mangle: false,
          compress: false
        },
        jsmin: {
          files: {
            '<%= meta.js %>app.min.js': [
              '<%= meta.js %>app.js'  
            ],
            '<%= meta.js %>validator.min.js': [
              '<%= meta.js %>validator.js'  
            ]
          }
        }
      }
    });

    // ////////////////// //
    // LOAD GRUNT MODULES //
    // ////////////////// //
    
    // Complile LESS
    grunt.loadNpmTasks('grunt-contrib-less');

    // Uglify for minification
    grunt.loadNpmTasks('grunt-contrib-uglify');
    

    // //////////////////// //
    // REGISTER GRUNT TASKS //
    // //////////////////// //
    // Default task(s).
    grunt.registerTask('default', ['build']);

    grunt.registerTask('build', ['less:compile', 'uglify:jsmin']);

    // Minify CSS files only
    grunt.registerTask('css', ['less:compile']);

    // Minify JS files only
    grunt.registerTask('js', ['uglify:jsmin']);

  };

}(module));
