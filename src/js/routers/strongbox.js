import ErrorView from "../views/error.js";

import View from "../View.js";

function NotFoundRouter( router ){
    router( ( context, next ) => {
        var error = ErrorView;

        error.data = error.data || {};
        error.data.construct = {
            "verb": "GET",
            "path": context.canonicalPath,
            "error": 404
        };

        View.load( ErrorView );

        next();
    } );
}

export { NotFoundRouter as after };
