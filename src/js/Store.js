import { Observable } from "rxjs/Observable";
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
        return state.logging.last;
    }
};

export default Store;
