import Controller from "../Controller.js";

import SecretsView from "../views/secrets.js";

var Secrets = Controller.create( {
    actionDefault( ctx ){
        this.loadView( SecretsView, ctx );
    }
} );

export default Secrets;
