import Controller from "../Controller.js";

import LoginView from "../views/login.js";

var Home = Controller.create( {
    actionLogin( ctx ){
        this.loadView( LoginView, ctx );
    }
} );

export default Home;
