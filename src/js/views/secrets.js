import Templates from "../Templates.js";

import Secrets from "../common/Secrets.js";
import Icon from "../components/Icon.js";

import translations from "../nls/views/secrets.js";

var SecretsView = {
    "template": Templates.getView( "secrets" ),
    data(){
        return {
            "visible": false,
            "secrets": [],
            translations
        };
    },
    "components": {
        "icon": Icon
    },

    "on": {
        init(){
            this.getSecrets();
        }
    },

    getSecrets(){
        var backends = Secrets.backends();

        Object
            .keys( backends )
            .forEach( ( backend ) => {
                Secrets
                    .read( backends[ backend ], true )
                    .subscribe( ( secret ) => {
                        this.push( "secrets", secret );
                    } );
            } );
    }
};

export default SecretsView;
