import Authentication from "../Authentication.js";
import Controller from "../Controller.js";
import Store from "../Store.js";

import Router from "../common/routing/Router.js";

import LoginView from "../views/login.js";
import AuthConnector from "../connectors/auth.js";

import { createLoginSuccess } from "../common/actions/LOGIN_SUCCESS.js";

var Auth = Controller.create( {
    actionLogin( ctx ){
        Auth.loadView( LoginView, ctx );
    },
    actionLogout(){
        Authentication.logout();

        Router.go( {
            "name": "login"
        } );
    },

    login( username, password, follow = { "name": "home" } ){
        return AuthConnector
            .ldapLogin( username, password )
            .then( ( response ) => {
                Store.dispatch( createLoginSuccess( {
                    "auth": response.auth
                } ) );

                Router.go( follow );
            } );
    },

    subscriber( storeStream ){
        storeStream.subscribe( Auth.handleRouteChange( {
            "login": Auth.actionLogin,
            "logout": Auth.actionLogout
        } ) );
    }
} );

export default Auth;
