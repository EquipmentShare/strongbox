import { createStore, applyMiddleware } from "redux";

import RootReducer from "./common/reducers/root.js";
import ReduxLogger from "./common/middlewares/reduxLogger.js";

import controllers from "./controllers/controllers.js";

var Store = {
    init(){
        return Store.create( RootReducer, applyMiddleware( ReduxLogger ) );
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
