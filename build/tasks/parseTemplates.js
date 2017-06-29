var glob = require( "glob" );
var Ractive = require( "ractive" );

function convertTemplate( filename, templates, grunt ){
    var parts = filename.split( "/" );
    var storage = templates[ parts[ 0 ] ] || {};
    var restPath = parts.slice( 1 ).join( "/" );

    var template = grunt.file.read( `${process.cwd()}/src/content/html/${filename}` );

    storage[ restPath ] = Ractive.parse( template );

    templates[ parts[ 0 ] ] = storage;

    return templates;
}

module.exports = function templateParserRegistrar( grunt ){
    "use strict";

    grunt.registerTask( "parseTemplates", function templateParser(){
        var done = this.async();
        var templates = {};

        glob(
            "**/*.html",
            {
                "cwd": process.cwd() + "/src/content/html"
            },
            ( err, files ) => {
                if( err ){
                    grunt.fail.fatal( err );
                }
                else{
                    files.forEach(
                        ( filename ) => {
                            templates = convertTemplate( filename, templates, grunt );
                        }
                    );
                }

                grunt.file.write( `${process.cwd()}/src/content/html/templates.json`, JSON.stringify( templates ) );

                done();
            }
        );
    } );
};
