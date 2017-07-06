import { createStore } from "redux";

import RootReducer from "./common/reducers/root.js";

import Auth from "./controllers/Auth.js";
import Home from "./controllers/Home.js";
import Secrets from "./controllers/Secrets.js";

var controllers = [
    Auth,
    Home,
    Secrets
];

var Store = {
    init(){
        return Store.create( RootReducer );
    },
    create( ...args ){
        return createStore( ...args );
    },
    get(){
        return window[ window.ns ].store;
    },
    registerAllControllers( store ){
        controllers.forEach( ( controller ) => {
            store.subscribe( () => controller.subscriber( store.getState() ) );
        } );
    }
};

export default Store;
