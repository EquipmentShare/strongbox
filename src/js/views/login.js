import Templates from "../Templates.js";

import translations from "../nls/views/login.js";

var LoginView = {
    "template": Templates.getView( "login" ),
    data(){
        return {
            translations
        };
    }
};

export default LoginView;
