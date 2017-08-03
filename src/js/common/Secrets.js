import { Observable } from "rxjs/Observable";

import Key from "./Key.js";
import System from "../System.js";
import BackendConnectorFactory from "./BackendConnectorFactory.js";

var Secrets;

function methodByKey( key ){
    var method = "read";

    if( Key.isPath( key ) ){
        method = "list";
    }

    return method;
}

function readSecret( key ){
    var backend = BackendConnectorFactory( key );
    var method = methodByKey( key );
    var promise;

    if( !backend ){
        throw new Error( `No backend connector configured for the keypath ${key}.` );
    }
    else{
        promise = backend[ method ]( key ).then(
            ( response ) => Secrets.normalize( key, response.data )
        );
    }

    return promise;
}

function readSecretsFrom( key, pipe ){
    var secret = readSecret( key );

    secret.then( ( val ) => {
        pipe.next( val );

        if( val.data.keys ){
            val.data.keys.forEach( ( k ) => {
                readSecretsFrom( key + k, pipe );
            } );
        }
    } );
}

Secrets = {
    normalize( key, data ){
        return {
            "path": key,
            "data": data
        };
    },
    backends(){
        return System.getSettings().backends;
    },
    read( path, deep = false ){
        return Observable.create( ( observer ) => {
            if( !deep ){
                readSecret( path ).then( ( secret ) => {
                    observer.next( secret );
                } );
            }
            else{
                readSecretsFrom( path, observer );
            }
        } );
    }
};

export default Secrets;
