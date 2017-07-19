import page from "page";
import defaults from "lodash/fp/defaults";
import template from "lodash/template";

import Routes from "./Routes.js";
import Bridge from "./AppRouterBridge.js";
import Store from "../../Store.js";

import { createRouteChangeUnhandled } from "../actions/ROUTE_CHANGE_UNHANDLED.js";

var Router;

function routeToFullPath( path ){
    return window[ window.ns ].router( path );
}

function mapAllRoutes( rawRoutes ){
    var allRoutes = {};
    var names;

    Object
        .values( rawRoutes )
        .forEach( ( group ) => {
            allRoutes = Object.assign( {}, allRoutes, group );
        } );

    names = Object.keys( allRoutes );

    return names.map(
        ( name ) => Object.assign( { "name": name }, allRoutes[ name ] )
    );
}

function registerCatchall( router ){
    router( ( context, next ) => {
        Store.get().dispatch( createRouteChangeUnhandled(
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
        var mapped = mapAllRoutes( Routes.getRawRoutes() );

        mapped.forEach( ( definition ) => {
            let path = definition.route;

            page(
                RegExp( `^${path}(?:/)?$` ),
                Bridge.steps.injectDefinitionStep.bind( definition ),
                Bridge.steps.enforcePermissionsStep.bind( page ),
                Bridge.steps.setupChromeStep,
                Bridge.steps.actionStep
            );
        } );

        registerCatchall( page );
        done( page );
    }
};

export default Router;
