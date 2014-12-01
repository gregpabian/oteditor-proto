module.exports = function( grunt ) {
	require( 'load-grunt-tasks' )( grunt );

	grunt.initConfig( {
		browserify: {
			build: {
				src: [ 'js/main.js' ],
				dest: 'build/observer.js',
				options: {
					watch: true,
					keepAlive: true
				}
			}
		}
	} );

	grunt.registerTask( 'default', 'browserify' );
};