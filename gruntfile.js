module.exports = function(grunt) {

	const sass = require('node-sass');

	// Load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
	require('load-grunt-tasks')(grunt);

	// Project & task configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		/**
		 * Grunt Sass
		 * Compile Sass to CSS using node-sass
		 * https://www.npmjs.com/package/grunt-sass
		 */
		sass: {
			options: {
				implementation: sass
			},
			dist: {
				options: {
					sourceMap: false,
					outputStyle: 'expanded',
					precision: 5
				},
				files: {
					'src/css/tiny-flex-grid.css' : 'src/scss/tiny-flex-grid.scss'
				}
			},
			'dist-min': {
				options: {
					sourceMap: false,
					outputStyle: 'compressed'
				},
				files: {
					'src/css/tiny-flex-grid.min.css' : 'src/scss/tiny-flex-grid.scss'
				}
			}
		},

		/**
		 * Grunt PostCSS
		 * Apply post-processors to CSS
		 * https://www.npmjs.com/package/grunt-postcss
		 */
		postcss: {
			options: {
				processors: [
					require('autoprefixer')({
						overrideBrowserslist: 'last 2 versions, > 1%, ie >= 11'
					})
				]
			},
			dist: {
				src: 'src/css/tiny-flex-grid.css',
  			dest: 'dist/tiny-flex-grid.css'
			},
			'dist-min': {
				src: 'src/css/tiny-flex-grid.min.css',
  			dest: 'dist/tiny-flex-grid.min.css'
			},
			'test-dist': {
				src: 'src/css/tiny-flex-grid.min.css',
  			dest: 'test/src/tiny-flex-grid.min.css'
			}
		},

		/**
		 * Grunt Contrib Watch
		 * Monitor files and execute tasks
		 * https://www.npmjs.com/package/grunt-contrib-watch
		 */
		watch: {
			sass: {
				files: [
					'src/scss/**/*.scss'
				],
				tasks: [
					'sass',
					'postcss'
				] 				
			}
		}

	});

	// Register custom tasks
	grunt.registerTask('default', ['watch']);

};