import Controller from "../Controller.js";

import ErrorView from "../views/error.js";

var Error = Controller.create( {
    actionDefault( ctx ){
        Error.loadView( ErrorView, ctx );
    },

    subscriber( state ){
        var responder = ( () => {} );
        var hasState = Boolean( state );
        var hasError = hasState && state.routing.currentError;

        if( hasState && hasError ){
            responder = () => {
                Error.actionDefault( Object.assign(
                    {},
                    state.routing.currentContext,
                    { "error": state.routing.currentError }
                ) );
            };
        }

        responder();
    }
} );

export default Error;
