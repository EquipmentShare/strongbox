import page from "page";
import merge from "lodash/fp/merge";
import defaults from "lodash/fp/defaults";
import template from "lodash/template";

import Routes from "./Routes.js";
import State from "../../State.js";

import Core from "../../routers/core.js";
import Secrets from "../../routers/secrets.js";
import * as Strongbox from "../../routers/strongbox.js";

var routers = [
    Core,
    Secrets
];
var Router;

function routeToFullPath( path ){
    return window[ window.ns ].router( path );
}

function assignIntoState( blob ){
    var state = State.get();

    // NOTE - Merge may not be the right action here.
    //
    //  Since it will leave left-side properties in place if they exist and if the right-side assignment is undefined,
    //  there could be a situation where content at an identical keypath exists in a
    //  previous state and is intended to be wiped out in the new state,
    //  but it will be left alone since the new state doesn't have it.
    //
    //  If this is a problem, there will need to be smarter state overwriting.
    state = merge( state, blob );

    return State.set( null, state );
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
                "params": undefined,
                "state": undefined
            },
            options
        );

        if( options.state && options.name ){
            assignIntoState( options.state );
        }

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
