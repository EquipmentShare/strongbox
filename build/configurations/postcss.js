module.exports = function postcssTask(){
    "use strict";

    var clean = require( "postcss-clean" );
    var styleLint = require( "stylelint" );

    return {
        "lint": {
            "options": {
                "writeDest": false,
                "failOnError": true,
                "processors": [
                    styleLint
                ]
            },
            "files": [ {
                "expand": true,
                "cwd": "src/css",
                "src": [ "**/*.css" ]
            } ]
        },
        "build": {
            "options": {
                "processors": [
                    clean( {
                        "inlineTimeout": 10000
                    } )
                ]
            },
            "files": [ {
                "expand": true,
                "cwd": "public/css",
                "src": [ "screen.css" ],
                "dest": "public/css",
                "extDot": "last",
                "ext": ".min.css"
            } ]
        }
    };
};
