import Ractive from "ractive";

import Templates from "../Templates.js";

var ChromeView = Ractive.extend( {
    "template": Templates.getView( "chrome" ),
    data(){
        return {
            "collapsed": false,
            "selected": "home"
        };
    },

    "on": {
        flex(){
            this.toggle( "collapsed" );
        }
    },

    setMenu( newSelection = "home" ){
        this.set( "selected", newSelection );
    }
} );

export default ChromeView;
