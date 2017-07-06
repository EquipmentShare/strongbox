import Controller from "../Controller.js";
import Store from "../Store.js";
import Router from "../common/routing/Router.js";

import * as RouteChange from "../common/actions/ROUTE_CHANGE.js";

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
        var lastAction = Store.getLastAction( state );

        if( lastAction && lastAction.action.type == RouteChange.TYPE ){
            let responders = {
                "login": Auth.actionLogin,
                "logout": Auth.actionLogout
            };
            let routeName = state.routing.currentContext.definition.name;

            if( responders[ routeName ] ){
                responders[ routeName ]( state.routing.currentContext );
            }
        }
    }
} );

export default Auth;
