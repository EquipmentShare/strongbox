import RoutingReducer from "./routing.js";

var initialState = {
    "routing": {
        "currentContext": {}
    }
};

export default function rootReducer( state = initialState, action ){
    return {
        "routing": RoutingReducer( state.routing, action )
    };
}
