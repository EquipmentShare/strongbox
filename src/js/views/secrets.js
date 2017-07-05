import Templates from "../Templates.js";

import translations from "../nls/views/secrets.js";

var SecretsView = {
    "template": Templates.getView( "secrets" ),
    data(){
        return {
            translations
        };
    }
};

export default SecretsView;
