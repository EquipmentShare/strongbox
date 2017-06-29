import has from "lodash/fp/has";

import Storage from "./Storage.js";

var State = {
    get( key ){
        var path = key ? `appState.${key}` : "appState";

        return Storage.Session.get( path );
    },
    set( key, state ){
        var path = key ? `appState.${key}` : "appState";

        return Storage.Session.set( path, state );
    },
    extractFromView( view ){
        var state = {};

        if( has( "mountContext.meta.app.appState", view ) ){
            state = view.mountContext.meta.app.appState || {};
        }

        return state;
    }
};

export default State;
