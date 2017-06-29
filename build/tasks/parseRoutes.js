var glob = require( "glob" );
var camelCase = require( "lodash/fp/camelCase" );
var upperFirst = require( "lodash/fp/upperFirst" );

module.exports = function routesParserRegistrar( grunt ){
    "use strict";

    grunt.registerTask( "parseRoutes", function routesParser(){
        var done = this.async();
        var routes = {};

        glob(
            "**/*.json",
            {
                "cwd": process.cwd() + "/src/content/routes",
                "ignore": [
                    "clientRoutes\.json"
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
                            let key = upperFirst( camelCase( name ) );
                            let value = grunt.file.read( `${process.cwd()}/src/content/routes/${filename}` );

                            routes[ key ] = JSON.parse( value );
                        }
                    );
                }

                grunt.file.write( `${process.cwd()}/src/content/routes/clientRoutes.json`, JSON.stringify( routes ) );

                done();
            }
        );
    } );
};
