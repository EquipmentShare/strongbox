import Templates from "../Templates.js";

import translations from "../nls/views/error.js";

var ErrorView = {
    "template": Templates.getView( "error" ),
    data(){
        return {
            "error": {},
            translations
        };
    },

    "on": {
        init(){
            this.set( "error", this.mountContext.error || {} );
        }
    }
};

export default ErrorView;
