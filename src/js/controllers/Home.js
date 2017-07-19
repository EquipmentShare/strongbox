import Controller from "../Controller.js";

import HomeView from "../views/home.js";

var Home = Controller.create( {
    actionDefault( ctx ){
        Home.loadView( HomeView, ctx );
    },

    subscriber( storeStream ){
        storeStream.subscribe( Home.handleRouteChange( {
            "home": Home.actionDefault
        } ) );
    }
} );

export default Home;
