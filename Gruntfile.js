module.exports = function(grunt) {

     
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {   
            js: {
                src: [
                    'public/app/assets/js/jquery-3.3.1.min.js',
                    'public/app/assets/js/bootstrap.min.js',
                    'public/app/assets/js/angular.min.js',
                    'public/app/assets/js/angular-route.min.js',
                    

                ],
                dest: 'public/app/assets/build/vendorscript.js',
            },
            css:{
            	 src: [
                    'public/app/assets/css/*.css', // All JS in the libs folder
                ],
                dest: 'public/app/assets/build/vendorstyle.css',
            }
        },
        uglify: {
            build:{
                files:[{
                    src:'public/app/assets/build/vendorscript.js',
                    dest:'public/app/assets/build/vendorscript.min.js'

                }]
            }

        },
        cssmin: {
            build:{
                files:[{
                    src:'public/app/assets/build/vendorstyle.css',
                    dest:'public/app/assets/build/vendorstyle.min.css'

                }]
            }

        }


    });

  
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


   
    grunt.registerTask('concat-vendorjs', ['concat:js']);
    grunt.registerTask('concat-vendorcss', ['concat:css']);
    grunt.registerTask('concat-vendorminjs', ['uglify:build']);
    grunt.registerTask('concat-vendormincss', ['cssmin:build']);




}