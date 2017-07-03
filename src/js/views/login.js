import Templates from "../Templates.js";

import AuthConnector from "../connectors/auth.js";
import Authentication from "../Authentication.js";

import translations from "../nls/views/login.js";

var LoginView = {
    "template": Templates.getView( "login" ),
    data(){
        return {
            "username": "",
            "password": "",
            translations
        };
    },

    "on": {
        login(){
            var data = this.get();

            AuthConnector
                .test( data.username, data.password )
                .then(
                    ( response ) => {
                        Authentication.setToken( response.auth.client_token );
                    },
                    () => {
                        /* eslint "no-console": "off", "no-debugger": "off", "vars-on-top": "off", "no-unused-vars": "off", "complexity": "off" */
                        console.log( "handle errors in form" );
                    }
                );

            return false;
        }
    }
};

export default LoginView;
