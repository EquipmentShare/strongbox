import unset from "lodash/fp/unset";
import set from "lodash/fp/set";
import get from "lodash/fp/get";

var RuntimeStorageStrategy;

function getRuntimeStorage(){
    return window[ window.ns ].storage || {};
}

function setRuntimeStorage( container = {} ){
    window[ window.ns ].storage = container;
}

RuntimeStorageStrategy = {
    "get": ( key ) => get( `storage.${key}`, getRuntimeStorage() ),
    "set": ( key, val ) => setRuntimeStorage( set( `storage.${key}`, val, getRuntimeStorage() ) ),
    "remove": ( key ) => setRuntimeStorage( unset( `storage.${key}`, getRuntimeStorage() ) )
};

export default RuntimeStorageStrategy;
