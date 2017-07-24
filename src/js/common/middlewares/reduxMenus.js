import * as MainMenuSelect from "../actions/MAIN_MENU_SELECT.js";
import * as MainMenuToggle from "../actions/MAIN_MENU_TOGGLE.js";

import Storage from "../../Storage.js";

export default function reduxMenus(){
    return ( next ) => ( action ) => {
        next( action );

        if( action.type == MainMenuSelect.TYPE ){
            Storage.set( "strongbox.menus.main.active", action.selected );
        }
        else if( action.type == MainMenuToggle.TYPE ){
            Storage.set( "strongbox.menus.main.collapsed", action.collapsed );
        }
    };
}
