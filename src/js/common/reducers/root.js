import RoutingReducer from "./routing.js";
import LoggingReducer from "./logging.js";

var initialState = {
    "routing": {
        "currentContext": {}
    },
    "logging": {
        "last": null
    }
};

export default function rootReducer( state = initialState, action ){
    return {
        "routing": RoutingReducer( state.routing, action ),
        "logging": LoggingReducer( state.logging, action )
    };
}
