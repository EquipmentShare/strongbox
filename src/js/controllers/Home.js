import Controller from "../Controller.js";
import Store from "../Store.js";

import * as RouteChange from "../common/actions/ROUTE_CHANGE.js";

import HomeView from "../views/home.js";

var Home = Controller.create( {
    actionDefault( ctx ){
        Home.loadView( HomeView, ctx );
    },

    subscriber( state ){
        var lastAction = Store.getLastAction( state );

        if( lastAction && lastAction.action.type == RouteChange.TYPE ){
            let responders = {
                "home": Home.actionDefault
            };
            let routeName = state.routing.currentContext.definition.name;

            if( responders[ routeName ] ){
                responders[ routeName ]( state.routing.currentContext );
            }
        }
    }
} );

export default Home;
