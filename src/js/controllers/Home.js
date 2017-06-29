import Controller from "../Controller.js";

import HomeView from "../views/home.js";

var Home = Controller.create( {
    actionDefault( ctx ){
        this.loadView( HomeView, ctx );
    }
} );

export default Home;
