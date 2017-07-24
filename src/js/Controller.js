import String from "./String.js";
import View from "./View.js";
import Store from "./Store.js";

import * as RouteChange from "./common/actions/ROUTE_CHANGE.js";

var Controller = {
    runAction( action = "default", context = {} ){
        this[ `action${String.uppercaseFirst( action )}` ]( context );
    },
    unloadView(){
        View.unload();
    },
    loadView( view, ctx ){
        return View.load( view, ctx );
    },
    create( props ){
        return Object.assign( Object.create( Controller ), props );
    },
    subscriber(){},
    handleAction( map ){
        return ( state ) => {
            let lastAction = Store.getLastAction( state );

            if( lastAction && map[ lastAction.type ] ){
                map[ lastAction.type ]( state );
            }
        };
    },
    handleRouteChange( map ){
        return Controller.handleAction( {
            [RouteChange.TYPE]: ( state ) => {
                let routeName = state.routing.currentContext.definition.name;

                if( map[ routeName ] ){
                    map[ routeName ]( state.routing.currentContext );
                }
            }
        } );
    }
};

export default Controller;
