import Controller from "../Controller.js";

import * as RouteChangeUnhandled from "../common/actions/ROUTE_CHANGE_UNHANDLED.js";

import ErrorView from "../views/error.js";

var ErrorController = Controller.create( {
    actionDefault( ctx ){
        ErrorController.loadView( ErrorView, ctx );
    },

    subscriber( storeStream ){
        storeStream.subscribe( ErrorController.handleAction( {
            [RouteChangeUnhandled.TYPE]: ( state ) => {
                ErrorController.actionDefault( Object.assign(
                    {},
                    state.routing.currentContext,
                    { "error": state.routing.currentError }
                ) );
            }
        } ) );
    }
} );

export default ErrorController;
