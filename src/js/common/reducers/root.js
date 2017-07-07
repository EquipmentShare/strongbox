import RoutingReducer from "./routing.js";
import LoggingReducer from "./logging.js";

var initialState = {
    "routing": {
        "currentContext": {}
    },
    "log": []
};

export default function rootReducer( state = initialState, action ){
    return {
        "routing": RoutingReducer( state.routing, action ),
        "log": LoggingReducer( state.log, action )
    };
}
