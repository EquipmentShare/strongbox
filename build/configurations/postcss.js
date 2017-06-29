module.exports = function postcssTask(){
    "use strict";

    var clean = require( "postcss-clean" );
    var styleLint = require( "stylelint" );
    var autoprefixer = require( "autoprefixer" );

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
                    autoprefixer( {
                        "browsers": [ // Autoprefixer uses browserlist >= 2.0
                            "last 2 versions",
                            "not ie_mob 1-100",
                            "not samsung 1-100",
                            "not baidu 1-100",
                            "not blackberry 1-100",
                            "not and_uc 1-100",
                            "not and_qq 1-100",
                            "not android < 56"
                        ]
                    } ),
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
