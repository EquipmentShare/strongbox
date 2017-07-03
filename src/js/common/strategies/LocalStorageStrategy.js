import isString from "lodash/fp/isString";
import isNumber from "lodash/fp/isNumber";
import isBoolean from "lodash/fp/isBoolean";
import unset from "lodash/fp/unset";
import set from "lodash/fp/set";
import get from "lodash/fp/get";

import Json from "../../Json.js";

var LocalStorageStrategy;

function getPathSplits( path ){
    var pathParts = path.split( "." );

    return [ pathParts.shift(), pathParts.join( "." ) ];
}

function needsToBeString( val ){
    return !isBoolean( val ) && !isString( val ) && !isNumber( val );
}

function getStorable( val, shouldString ){
    return shouldString ? JSON.stringify( val ) : val;
}

LocalStorageStrategy = {
    get( path ){
        var parts = getPathSplits( path );
        var storage = window.localStorage.getItem( parts[ 0 ] );

        if( parts[ 1 ] ){
            storage = get( parts[ 1 ], Json.parse( storage ) );
        }

        return storage;
    },
    set( path, value ){
        var parts = getPathSplits( path );
        var storage;

        if( parts[ 1 ] ){
            storage = LocalStorageStrategy.get( parts[ 0 ] ) || {};
            storage = set( parts[ 1 ], value, Json.parse( storage ) );

            window.localStorage.setItem(
                parts[ 0 ],
                getStorable( storage, needsToBeString( storage ) )
            );
        }
        else{
            window.localStorage.setItem(
                parts[ 0 ],
                getStorable( value, needsToBeString( value ) )
            );
        }

        return value;
    },
    remove( path ){
        var parts = getPathSplits( path );
        var storage;

        if( parts[ 1 ] ){
            storage = LocalStorageStrategy.get( parts[ 0 ] );
            storage = unset( Json.parse( storage ), parts[ 1 ] );

            LocalStorageStrategy.set( parts[ 0 ], storage );
        }
        else{
            window.localStorage.removeItem( parts[ 0 ] );
        }
    }
};

export default LocalStorageStrategy;
