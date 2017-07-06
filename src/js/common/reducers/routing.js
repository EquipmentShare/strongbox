import * as RouteChange from "../actions/ROUTE_CHANGE.js";
import * as RouteChangeUnhandled from "../actions/ROUTE_CHANGE_UNHANDLED.js";

export default function routingReducer( state = {}, action ){
    var newState = state;
    var handlers = {
        [RouteChange.TYPE]: () => {
            newState = {
                "currentContext": action.context,
                "currentError": false
            };
        },
        [RouteChangeUnhandled.TYPE]: () => {
            newState = {
                "currentContext": action.context,
                "currentError": action.error
            };
        }
    };

    if( handlers[ action.type ] ){
        handlers[ action.type ]();
    }

    return newState;
}
