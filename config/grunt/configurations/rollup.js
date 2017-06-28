var resolve = require( "rollup-plugin-node-resolve" );
var cjs = require( "rollup-plugin-commonjs" );

module.exports = function rollupTask(){
    return {
        options: {
            plugins: [
                resolve(),
                cjs()
            ]
        },
        files: {
            "dest":"public/js/strongbox.js",
            "src": "src/js/strongbox.js",
        }
    }
}
