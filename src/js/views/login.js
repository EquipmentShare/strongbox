import Templates from "../Templates.js";

import AuthController from "../controllers/Auth.js";

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

            AuthController
                .login( data.username, data.password )
                .catch( () => {
                    /* eslint "no-console": "off", "no-debugger": "off", "vars-on-top": "off", "no-unused-vars": "off", "complexity": "off" */
                    console.log( "handle errors in form" );
                } );

            return false;
        }
    }
};

export default LoginView;
