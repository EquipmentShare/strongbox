import Ractive from "ractive";

import Templates from "../Templates.js";
import Storage from "../Storage.js";

var ChromeView = Ractive.extend( {
    "template": Templates.getView( "chrome" ),
    data(){
        return {
            "collapsed": false,
            "selected": "home"
        };
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
    }
} );

export default ChromeView;
