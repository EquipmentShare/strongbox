import * as RouteChange from "../actions/ROUTE_CHANGE.js";

export default function routingReducer( state = {}, action ){
    var newState = state;
    var handlers = {
        [RouteChange.TYPE]: () => {
            newState = {
                "currentContext": action.context
            };
        }
    };

    if( handlers[ action.type ] ){
        handlers[ action.type ]();
    }

    return newState;
}
