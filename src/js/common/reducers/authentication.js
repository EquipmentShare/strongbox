import * as LoginSuccess from "../actions/LOGIN_SUCCESS.js";

export default function autheticationReducer( state = {}, action ){
    var newState = state;
    var handlers = {
        [LoginSuccess.TYPE]: () => {
            newState = {
                "token": action.auth.client_token
            };
        }
    };

    if( handlers[ action.type ] ){
        handlers[ action.type ]();
    }

    return newState;
}
