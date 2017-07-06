import page from "page";
import defaults from "lodash/fp/defaults";
import template from "lodash/template";

import Routes from "./Routes.js";

import routers from "../../routers/routers.js";
import * as Strongbox from "../../routers/strongbox.js";

var Router;

function routeToFullPath( path ){
    return window[ window.ns ].router( path );
}

Router = {
    hydrate( name, namespace, params ){
        var route = Routes.getClientRoute( name, namespace );
        var path = template( route, { "variable": "params" } );
        var navigable;

        if( route ){
            navigable = path( params );
        }

        return navigable;
    },
    go( options ){
        options = defaults(
            {
                "name": undefined,
                "namespace": undefined,
                "params": undefined
            },
            options
        );

        if( options.name ){
            routeToFullPath( Router.hydrate( options.name, options.namespace, options.params ) );
        }
    },
    init( done ){
        routers.forEach( ( router ) => {
            router( page );
        } );

        Strongbox.after( page );

        done( page );
    }
};

export default Router;
