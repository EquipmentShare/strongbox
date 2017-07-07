import Controller from "../Controller.js";
import Store from "../Store.js";

import * as RouteChangeUnhandled from "../common/actions/ROUTE_CHANGE_UNHANDLED.js";

import ErrorView from "../views/error.js";

var Error = Controller.create( {
    actionDefault( ctx ){
        Error.loadView( ErrorView, ctx );
    },

    subscriber( state ){
        var lastAction = Store.getLastAction( state );

        if( lastAction && lastAction.action.type == RouteChangeUnhandled.TYPE ){
            Error.actionDefault( Object.assign(
                {},
                state.routing.currentContext,
                { "error": state.routing.currentError }
            ) );
        }
    }
} );

export default Error;
