import { createStore } from "redux";

import RootReducer from "./common/reducers/root.js";

import controllers from "./controllers/controllers.js";

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
