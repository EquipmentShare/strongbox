import { Observable } from "rxjs";
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
    toObservable( store ){
        return Observable.create(
            ( observer ) => {
                let unsub = store.subscribe(
                    () => observer.next( store.getState() )
                );

                return function unsubscribe(){
                    unsub();
                };
            }
        );
    },
    registerAllControllers( store ){
        var stream = Store.toObservable( store );

        controllers.forEach( ( controller ) => {
            controller.subscriber( stream );
        } );
    },
    getLastAction( state ){
        var lastAction = state.log.length > 0 ? state.log[ state.log.length - 1 ] : false;

        return lastAction;
    }
};

export default Store;
