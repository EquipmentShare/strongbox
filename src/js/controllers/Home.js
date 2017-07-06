import Controller from "../Controller.js";

import HomeView from "../views/home.js";

var Home = Controller.create( {
    actionDefault( ctx ){
        Home.loadView( HomeView, ctx );
    },

    subscriber( state ){
        var responder = ( () => {} );
        var responders = {
            "home": Home.actionDefault
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

export default Home;
