module.exports = function DefaultGruntTask( grunt ){
    /* This is what will run if you don't give Grunt any directions */
    grunt.registerTask( "default", () => {
        var tasks = [
            "eslint",

            "parseTemplates",
            "parseRoutes",
            "parseControllers",

            "rollup",
            "concat:app",

            "postcss:lint",
            "concat:css",
            "postcss:build",

            "notify:build"
        ];

        grunt.task.run( tasks );
    } );
};
