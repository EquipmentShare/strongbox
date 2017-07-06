import * as LogAction from "../actions/LOG_ACTION.js";

export default function reduxLogger( store ){
    return ( next ) => ( action ) => {
        if( action.type != LogAction.TYPE ){
            store.dispatch( LogAction.createLogAction( action, store.getState() ) );
        }

        next( action );
    };
}
