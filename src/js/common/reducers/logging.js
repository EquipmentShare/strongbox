import Chance from "chance";

import * as LogAction from "../actions/LOG_ACTION.js";

export default function loggingReducer( state = [], action ){
    var chance = new Chance();
    var guid = chance.guid();

    var newState = state;
    var handlers = {
        [LogAction.TYPE]: () => {
            newState = []
                .concat( newState )
                .concat( {
                    "id": guid,
                    "state": action.state,
                    "action": action.action
                } );
        }
    };

    if( handlers[ action.type ] ){
        handlers[ action.type ]();
    }

    return newState;
}
