import Controller from "../Controller.js";
import Router from "../common/routing/Router.js";

import LoginView from "../views/login.js";

import AuthConnector from "../connectors/auth.js";
import Authentication from "../Authentication.js";

var Auth = Controller.create( {
    actionLogin( ctx ){
        Auth.loadView( LoginView, ctx );
    },
    actionLogout(){
        Authentication.logout();

        Router.go( {
            "namespace": "Core",
            "name": "login"
        } );
    },

    login( username, password, follow = { "namespace": "Core", "name": "home" } ){
        return AuthConnector
            .ldapLogin( username, password )
            .then(
                ( response ) => {
                    Authentication.setToken( response.auth.client_token );

                    Router.go( follow );
                }
            );
    },

    subscriber( state ){
        var responder = ( () => {} );
        var responders = {
            "login": Auth.actionLogin,
            "logout": Auth.actionLogout
        };
        var hasState = Boolean( state );
        var routeName = hasState && state.routing.currentContext.definition.name;

        if( hasState && responders[ routeName ] ){
            responder = () => {
                responders[ routeName ]( state.routing.currentContext );
            };
        }

        responder();
    }
} );

export default Auth;
