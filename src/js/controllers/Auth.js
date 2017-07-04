import Controller from "../Controller.js";
import Router from "../common/routing/Router.js";

import LoginView from "../views/login.js";

import AuthConnector from "../connectors/auth.js";
import Authentication from "../Authentication.js";

var Home = Controller.create( {
    actionLogin( ctx ){
        this.loadView( LoginView, ctx );
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
    }
} );

export default Home;
