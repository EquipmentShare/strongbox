import { Observable } from "rxjs/Observable";
import { createStore, applyMiddleware } from "redux";

import { initialState, default as RootReducer } from "./common/reducers/root.js";
import ReduxAuth from "./common/middlewares/reduxAuth.js";
import ReduxMenus from "./common/middlewares/reduxMenus.js";

import Storage from "./Storage.js";
import Authentication from "./Authentication.js";

import controllers from "./controllers/controllers.js";

var Store = {
    init(){
        var coldState = Object.assign( {}, initialState );
        var storedToken = Authentication.getToken();
        var storedMenus = Storage.get( "strongbox.menus" );

        if( storedToken ){
            coldState.auth.token = storedToken;
        }

        if( storedMenus ){
            coldState.menus = Object.assign( {}, storedMenus );
        }

        return Store.create( RootReducer, coldState, applyMiddleware( ReduxAuth, ReduxMenus ) );
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
    },

    getState(){
        return Store.get().getState();
    },
    dispatch( action ){
        return Store.get().dispatch( action );
    },
    subscribe( fn ){
        return Store.get().subscribe( fn );
    }
};

export default Store;
