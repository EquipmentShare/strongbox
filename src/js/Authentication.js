import set from "lodash/fp/set";
import get from "lodash/fp/get";

import Security from "./Security.js";

var Authentication = {
    getToken(){
        var session = Security.getSession();

        return get( "token", session );
    },
    setToken( token ){
        var session = Security.getSession();

        return Authentication.startSession( set( "token", token, session ) );
    },

    logout(){
        Security.endSession();
    },
    startSession( session ){
        Security.setSession( session );
    },

    isLoggedIn(){
        return Boolean( Authentication.getToken() );
    }
};

/** The Authentication object */
export default Authentication;
