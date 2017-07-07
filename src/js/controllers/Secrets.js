import Controller from "../Controller.js";
import Store from "../Store.js";

import * as RouteChange from "../common/actions/ROUTE_CHANGE.js";

import SecretsView from "../views/secrets.js";

var Secrets = Controller.create( {
    actionDefault( ctx ){
        Secrets.loadView( SecretsView, ctx );
    },

    subscriber( state ){
        var lastAction = Store.getLastAction( state );

        if( lastAction && lastAction.action.type == RouteChange.TYPE ){
            let responders = {
                "secrets": Secrets.actionDefault
            };
            let routeName = state.routing.currentContext.definition.name;

            if( responders[ routeName ] ){
                responders[ routeName ]( state.routing.currentContext );
            }
        }
    }
} );

export default Secrets;
