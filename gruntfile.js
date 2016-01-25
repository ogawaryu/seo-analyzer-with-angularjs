module.exports = function(grunt) {

	"use strict";

	var config = {
		pkg : grunt.file.readJSON('package.json'),
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'exemplo/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'exemplo/'
				}]
			}
		}
	};

	// Init Grunt
	grunt.initConfig(config);

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	grunt.registerTask('default', []);
	grunt.registerTask('panda', ['imagemin']);

}