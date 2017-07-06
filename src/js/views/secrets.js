import Templates from "../Templates.js";

import GenericConnector from "../connectors/generic.js";
import Icon from "../components/Icon.js";

import translations from "../nls/views/secrets.js";

var SecretsView = {
    "template": Templates.getView( "secrets" ),
    data(){
        return {
            "visible": false,
            "secrets": {
                "secret": []
            },
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

    getSecrets( path = "" ){
        GenericConnector
            .list( path )
            .then( ( response ) => {
                if( response.data.keys ){
                    response.data.keys.forEach( ( key ) => {
                        let isPath = key.slice( -1 ) == "/";
                        let resp;

                        if( isPath ){
                            resp = GenericConnector.list( path + key );
                            this.getSecrets( path + key );
                        }
                        else{
                            resp = GenericConnector.read( path + key );
                        }

                        resp.then( ( result ) => {
                            this.push(
                                "secrets.secret",
                                {
                                    "path": path + key,
                                    "data": result.data
                                }
                            );
                        } );
                    } );
                }
                else{
                    this.push(
                        "secrets.secret",
                        {
                            "path": path,
                            "data": response.data
                        }
                    );
                }
            } );
    }
};

export default SecretsView;
