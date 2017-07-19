import Controller from "../Controller.js";

import SecretsView from "../views/secrets.js";

var Secrets = Controller.create( {
    actionDefault( ctx ){
        Secrets.loadView( SecretsView, ctx );
    },

    subscriber( storeStream ){
        storeStream.subscribe( Secrets.handleRouteChange( {
            "secrets": Secrets.actionDefault
        } ) );
    }
} );

export default Secrets;
