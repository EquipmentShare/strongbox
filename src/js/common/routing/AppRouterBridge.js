import RedirectAction from "../permissions/actions/Redirect.js";

import { createRouteChange } from "../actions/ROUTE_CHANGE.js";

import Permission from "../../Permission.js";
import Chrome from "../../Chrome.js";
import Store from "../../Store.js";

var actions = {
    "REDIRECT": RedirectAction
};

var Bridge = {
    "steps": {
        injectDefinitionStep( context, next ){
            context.definition = this;

            next();
        },
        enforcePermissionsStep( context, next ){
            var permissions = context.definition.permissions || [];

            permissions.forEach( ( permission ) => {
                permission.handler = Permission.getHandler( permission );
            } );

            if( Permission.passes( permissions ) ){
                next();
            }
            else{
                permissions.forEach( ( permission ) => {
                    permission.actions.forEach( ( action ) => {
                        action.handler = actions[ action.type ];
                    } );
                } );

                context.definition.permissions = permissions;

                Permission.runActions( this, permissions );
            }
        },
        setupChromeStep( context, next ){
            var definition = context.definition;

            Chrome.prepare( definition );

            next();
        },
        actionStep( context ){
            Store.get().dispatch( createRouteChange( context ) );
        }
    }
};

export default Bridge;
