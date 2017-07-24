import * as MainMenuSelect from "../actions/MAIN_MENU_SELECT.js";
import * as MainMenuToggle from "../actions/MAIN_MENU_TOGGLE.js";

export default function menusReducer( state = {}, action ){
    var newState = state;
    var handlers = {
        [MainMenuSelect.TYPE]: () => {
            let mainState = {
                "collapsed": state.main.collapsed,
                "active": action.selected
            };

            newState = Object.assign( {}, state, { "main": mainState } );
        },
        [MainMenuToggle.TYPE]: () => {
            let mainState = {
                "collapsed": action.collapsed,
                "active": state.main.active
            };

            newState = Object.assign( {}, state, { "main": mainState } );
        }
    };

    if( handlers[ action.type ] ){
        handlers[ action.type ]();
    }

    return newState;
}
