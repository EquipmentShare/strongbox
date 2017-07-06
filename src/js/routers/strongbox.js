import { createRouteChangeUnhandled } from "../common/actions/ROUTE_CHANGE_UNHANDLED.js";

import Store from "../Store.js";

function NotFoundRouter( router ){
    router( ( context, next ) => {
        Store
            .get()
            .dispatch( createRouteChangeUnhandled(
                Object.assign(
                    {},
                    context,
                    {
                        "definition": {
                            "name": "error",
                            "menu": "error"
                        }
                    }
                ),
                {
                    "verb": "GET",
                    "path": context.canonicalPath,
                    "error": 404
                }
            ) );

        next();
    } );
}

export { NotFoundRouter as after };
