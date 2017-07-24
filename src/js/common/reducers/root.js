import RoutingReducer from "./routing.js";
import LoggingReducer from "./logging.js";
import AuthenticationReducer from "./authentication.js";

export var initialState = {
    "routing": {
        "currentContext": {}
    },
    "logging": {
        "last": null
    },
    "auth": {
        "token": null
    }
};

export default function rootReducer( state = initialState, action ){
    return {
        "routing": RoutingReducer( state.routing, action ),
        "logging": LoggingReducer( state.logging, action ),
        "auth": AuthenticationReducer( state.auth, action )
    };
}
