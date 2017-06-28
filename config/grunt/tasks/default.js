module.exports = function DefaultGruntTask( grunt ){
    /* This is what will run if you don't give Grunt any directions */
    grunt.registerTask( "default", () => {
        var tasks = [
            "rollup",
            "postcss:lint",
            "concat:css",
            "postcss:build",
        ];

        grunt.task.run( tasks );
    } );
};
