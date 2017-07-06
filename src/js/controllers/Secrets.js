import Controller from "../Controller.js";

import SecretsView from "../views/secrets.js";

var Secrets = Controller.create( {
    actionDefault( ctx ){
        Secrets.loadView( SecretsView, ctx );
    },

    subscriber( state ){
        var responder = ( () => {} );
        var responders = {
            "secrets": Secrets.actionDefault
        };
        var hasState = Boolean( state );
        var routeName = hasState && state.routing.currentContext.definition.name;

        if( hasState && responders[ routeName ] ){
            responder = () => {
                responders[ routeName ]( state.routing.currentContext );
            };
        }

        responder();
    }
} );

export default Secrets;
