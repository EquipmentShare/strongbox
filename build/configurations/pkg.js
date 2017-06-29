module.exports = ( grunt ) => {
    "use strict";

    var build = grunt.template.today( "yyyymmdd.HHMMss.l" );

    return {
        "app": grunt.file.readJSON( "./package.json" ),
        "build": build,
        "banner": `window.ns="strongbox";
window[ window.ns ] = {
    "v": "${build}"
};
`
    };
};
