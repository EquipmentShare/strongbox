var glob = require( "glob" );

module.exports = function routersParserRegistrar( grunt ){
    "use strict";

    grunt.registerTask( "parseRouters", function routersParser(){
        var done = this.async();
        var routers = "";
        var names = [];

        glob(
            "**/*.js",
            {
                "cwd": process.cwd() + "/src/js/routers",
                "ignore": [
                    "routers.js",
                    "strongbox.js"
                ]
            },
            ( err, files ) => {
                if( err ){
                    grunt.fail.fatal( err );
                }
                else{
                    files.forEach(
                        ( filename ) => {
                            let name = filename.split( "." ).slice( 0, -1 ).join( "." );

                            names.push( name );

                            routers += `import ${name} from "./${name}.js";\n`;
                        }
                    );
                }

                routers += "\nexport default [";
                routers += "\n    " + names.join( ",\n    " );
                routers += "\n];";

                grunt.file.write( `${process.cwd()}/src/js/routers/routers.js`, routers );

                done();
            }
        );
    } );
};
