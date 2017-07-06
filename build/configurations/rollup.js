var resolve = require( "rollup-plugin-node-resolve" );
var cjs = require( "rollup-plugin-commonjs" );
var json = require( "rollup-plugin-json" );
var globals = require( "rollup-plugin-node-globals" );

module.exports = function rollupTask(){
    return {
        "options": {
            "plugins": [
                resolve(),
                cjs(),
                json(),
                globals()
            ],
            "format": "umd"
        },
        "files": {
            "dest": "public/js/strongbox.js",
            "src": "src/strongbox.js",
        }
    };
};
