import Ractive from "ractive";

import Icon from "../components/Icon.js";

import Authentication from "../Authentication.js";
import Templates from "../Templates.js";
import Storage from "../Storage.js";

import translations from "../nls/views/chrome.js";

var ChromeView = Ractive.extend( {
    "template": Templates.getView( "chrome" ),
    data(){
        return {
            "collapsed": false,
            "selected": "home",
            translations
        };
    },
    "computed": {
        loggedIn(){
            return Authentication.isLoggedIn();
        }
    },
    "components": {
        "icon": Icon
    },

    "on": {
        init(){
            this.loadState();
        },
        flex(){
            this.toggle( "collapsed" );

            Storage.set( "strongbox.menus.main.collapsed", this.get( "collapsed" ) );
        }
    },

    setMenu( newSelection = "home" ){
        this.set( "selected", newSelection );

        Storage.set( "strongbox.menus.main.active", newSelection );
    },
    loadState(){
        var menu = Storage.get( "strongbox.menus.main" );

        this.set( {
            "collapsed": menu && menu.collapsed || false,
            "selected": menu && menu.active || "home"
        } );
    },
    redraw(){
        this.update( "loggedIn" );
    }
} );

export default ChromeView;
