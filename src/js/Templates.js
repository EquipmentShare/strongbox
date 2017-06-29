import templates from "../content/html/templates.json";

var Templates;

function normalizePath( path, search ){
    if( !search[ path ] ){
        path = `${path}.html`;
    }

    return path;
}

Templates = {
    getComponent( path ){
        return templates.components[ normalizePath( path, templates.components ) ];
    },
    getView( path ){
        return templates.views[ normalizePath( path, templates.views ) ];
    },

    get( path, prefix = "" ){
        var prefixes = Object.keys( templates );
        var search = templates;
        var parts;

        if( prefixes.includes( prefix ) ){
            search = search[ prefix ];
        }
        else{
            parts = path.split( "/" );

            if( prefixes.includes( parts[ 0 ] ) ){
                search = search[ parts[ 0 ] ];

                path = parts.slice( 1 ).join( "/" );
            }
        }

        return search[ normalizePath( path, search ) ];
    }
};

export default Templates;
