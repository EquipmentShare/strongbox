module.exports = function( grunt ){
    "use strict";

    var config = require( "load-grunt-configs" )( grunt, {
        "config": {
            "src": "config/grunt/configurations/*.*"
        }
    } );

    require( "load-grunt-tasks" )( grunt );
    require( "time-grunt" )( grunt );

    grunt.initConfig( config );
    grunt.task.loadTasks( "config/grunt/tasks/" );
};
