import Templates from "../Templates.js";

import Icon from "../components/Icon.js";

import translations from "../nls/views/secrets.js";

var SecretsView = {
    "template": Templates.getView( "secrets" ),
    data(){
        return {
            translations
        };
    },
    "components": {
        "icon": Icon
    }
};

export default SecretsView;
