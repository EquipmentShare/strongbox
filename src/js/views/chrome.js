import Ractive from "ractive";

import Icon from "../components/Icon.js";

import Authentication from "../Authentication.js";
import Templates from "../Templates.js";
import Store from "../Store.js";

import { createMainMenuToggle } from "../common/actions/MAIN_MENU_TOGGLE.js";
import { createMainMenuSelect } from "../common/actions/MAIN_MENU_SELECT.js";

import translations from "../nls/views/chrome.js";

var ChromeView = Ractive.extend( {
    "template": Templates.getView( "chrome" ),
    data(){
        return {
            "collapsed": false,
            "selected": "home",
            "loggedIn": false,
            translations
        };
    },
    "components": {
        "icon": Icon
    },

    "on": {
        init(){
            Store.subscribe( () => {
                this.loadState();
            } );
        },
        render(){
            this.loadState();
        },
        flex(){
            this.toggle( "collapsed" );

            Store.dispatch( createMainMenuToggle( this.get( "collapsed" ) ) );
        }
    },

    setMenu( newSelection = "home" ){
        this.set( "selected", newSelection );

        Store.dispatch( createMainMenuSelect( newSelection ) );
    },
    loadState(){
        var state = Store.getState();

        if( state ){
            this.set( {
                "collapsed": state.menus.main.collapsed,
                "selected": state.menus.main.active,
                "loggedIn": Authentication.isLoggedIn()
            } );
        }
    }
} );

export default ChromeView;
