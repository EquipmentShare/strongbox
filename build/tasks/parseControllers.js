var glob = require( "glob" );

module.exports = function controllersParserRegistrar( grunt ){
    "use strict";

    grunt.registerTask( "parseControllers", function controllersParser(){
        var done = this.async();
        var controllers = "";
        var names = [];

        glob(
            "**/*.js",
            {
                "cwd": process.cwd() + "/src/js/controllers",
                "ignore": [
                    "controllers.js"
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

                            controllers += `import ${name} from "./${name}.js";\n`;
                        }
                    );
                }

                controllers += "\nexport default [";
                controllers += "\n    " + names.join( ",\n    " );
                controllers += "\n];";

                grunt.file.write( `${process.cwd()}/src/js/controllers/controllers.js`, controllers );

                done();
            }
        );
    } );
};
