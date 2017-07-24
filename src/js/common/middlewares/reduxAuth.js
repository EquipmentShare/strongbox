import * as LoginSuccess from "../actions/LOGIN_SUCCESS.js";

import Authentication from "../../Authentication.js";

export default function reduxAuth(){
    return ( next ) => ( action ) => {
        next( action );

        if( action.type == LoginSuccess.TYPE ){
            Authentication.setToken( action.auth.client_token );
        }
    };
}
