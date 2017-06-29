module.exports = ( grunt ) => {
    "use strict";

    var config = require( "load-grunt-configs" )( grunt, {
        "config": {
            "src": "build/configurations/*.*"
        }
    } );

    require( "load-grunt-tasks" )( grunt );
    require( "time-grunt" )( grunt );

    grunt.initConfig( config );
    grunt.task.loadTasks( "build/tasks/" );
};
