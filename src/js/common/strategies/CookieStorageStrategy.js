import cookies from "cookies-js";
import has from "lodash/fp/has";

import Security from "../../Security.js";

const APPROXIMATELY_TWENTY_YEARS_IN_MS = 1000 * 60 * 60 * 24 * 365 * 20;
var CookieStorageStrategy;

function getProtocolFromContext( context ){
    var proto;

    if( has( "location.protocol", context ) ){
        proto = context.location.protocol;
    }

    return proto;
}

CookieStorageStrategy = {
    get( path ){
        return cookies.get( path );
    },
    set( path, value ){
        var proto = getProtocolFromContext( window );

        cookies.set( path, value, {
            "path": "/",
            "expire": new Date( Date.now() + APPROXIMATELY_TWENTY_YEARS_IN_MS ),
            "secure": Security.isSecureProtocol( proto )
        } );
    },
    remove( path ){
        cookies.expire( path, {
            "path": "/"
        } );
    }
};

export default CookieStorageStrategy;
