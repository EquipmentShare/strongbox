import flatten from "lodash/fp/flatten";

import clientRoutes from "../../../content/routes/clientRoutes.json";

var Routes;

function getSearchSpace( possible, namespace ){
    var search;

    if( namespace == "any" ){
        search = Object.assign( {}, ...flatten( Object.values( possible ) ) );
    }
    else{
        search = possible[ namespace ] || [];
    }

    return search;
}

function makeNavigable( route ){
    var navigable = route.sluggable || route.route;

    route.navigable = navigable;

    return route;
}

function getPreferredRouteIdentifiers( routeName, namespace ){
    var routeParts = routeName.split( ":" );
    var name = routeName;

    if( routeParts.length > 1 ){
        namespace = routeParts[ 0 ] || namespace;
        name = routeParts[ 1 ];
    }

    return [ namespace, name ];
}

Routes = {
    getRawRoutes(){
        return clientRoutes;
    },
    getClientRoute( name, namespace = "any" ){
        var identifiers = getPreferredRouteIdentifiers( name, namespace );
        var route = makeNavigable( getSearchSpace( clientRoutes, identifiers[ 0 ] )[ identifiers[ 1 ] ] );

        if( route ){
            route = route.navigable;
        }

        return route;
    }
};

export default Routes;
