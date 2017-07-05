import get from "lodash/fp/get";

import isLoggedIn from "./common/permissions/isLoggedIn.js";
import isNotLoggedIn from "./common/permissions/isNotLoggedIn.js";

var Permission;

function runPermissionActions( router, permission ){
    var permissionActions = permission.actions;

    permissionActions.forEach(
        ( action ) => {
            let handler = typeof action.handler == "function" ? action.handler : () => {};

            handler( router, action );
        }
    );
}

Permission = {
    check( permission ){
        var criteriaMet = false;

        if( permission.handler && typeof permission.handler == "function" ){
            criteriaMet = permission.handler( permission );
        }

        return criteriaMet;
    },
    passes( permissions = [] ){
        /*
         * "passes" is defined here as not being caught by any permission check
         * E.G.
         *      If the only permissions check is LOGGED_IN, the check passes
         *          if the user is NOT logged in.
         *
         * So, the definition of "passes" here is to "not trigger any permission conditions"
         *
         * Indiana Jones only *passes* the dangerous tunnel if *all* of the deadly trap checks return false.
         */
        var passing = false;

        permissions.forEach(
            ( permission ) => {
                passing = passing || Permission.check( permission );
            }
        );

        return !passing;
    },
    runActions( router, permissions = [], failedStatesOnly = true ){
        if( failedStatesOnly ){
            permissions = permissions.filter( ( permission ) => permission.handler() );
        }

        permissions.forEach( ( perm ) => runPermissionActions( router, perm ) );
    },
    getHandler( permission ){
        var type = permission.type || "state";
        var keypath = `${type}s.${permission[ type ]}`;

        return get( keypath, Permission.permissions ) || ( () => {} );
    },
    "permissions": {
        "states": {
            "LOGGED_IN": isLoggedIn,
            "NOT_LOGGED_IN": isNotLoggedIn
        }
    }
};

export default Permission;
