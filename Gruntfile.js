'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      style: {
        files: {
          'build/css/style.css': 'source/sass/style.scss'
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'})
        ]
      },
      style: {
        src: 'build/css/*.css'
      }
    },

    watch: {
      style: {
        files: ['source/sass/**/*.scss'],
        tasks: ['sass', 'postcss'],
        options: {
          spawn: false,
          livereload: true
        }
      },
    html: {
        files: ['source/*.html', 'source/_html_inc/*.html'],
        tasks: ['includereplace:html'],
        options: {
          spawn: false,
          livereload: true
        },
      },
    },

    cmq: {
        style: {
            files: {
                "build/css/style.css": ["build/css/style.css"]
            }
        }
    },

    cssmin: {
        options: {
            keepSpecialComments: 0,
            report: "gzip"
            },
        style: {
            files: {
                "build/css/style.min.css": ["build/css/style.css"]
                }
            }
        },

    imagemin: {
        images: {
        options: {
            optimizationLevel: 3
            },
        files: [{
            expand: true,
            src: ["build/img/**/*.{png,jpg,gif,svg}"]
            }]
        }
    },

    copy: { 
        build: {
            files: [{
                expand: true,
                cwd: "source",
                src: ["img/**", "font/**", "js/**", "*.html" ],
                dest: "build"
            }]
        }
    },

    clean: { 
        build: ["build"]
    },

    uglify: {
        build: {
            src: 'source/js/script.js',
            dest: 'build/js/script.min.js'
        }
    },

    includereplace: {
        html: {
          options: {
            includesDir: 'source/_html_inc/'
          },
          files: [{
                src: '*.html', 
                dest: 'build/', 
                expand: true, 
                cwd: 'source'
            }]
        }
    }

};


    grunt.initConfig(config);

    grunt.registerTask("build", [
        "clean",
        "includereplace",
        "copy",
        "sass",
        "cmq",
        "postcss",
        "cssmin",
        "imagemin",
        "uglify"
    ]);
};