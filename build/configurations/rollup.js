var resolve = require( "rollup-plugin-node-resolve" );
var cjs = require( "rollup-plugin-commonjs" );
var json = require( "rollup-plugin-json" );

module.exports = function rollupTask(){
    return {
        "options": {
            "plugins": [
                resolve(),
                cjs(),
                json()
            ],
            "format": "umd"
        },
        "files": {
            "dest": "public/js/strongbox.js",
            "src": "src/strongbox.js",
        }
    };
};
