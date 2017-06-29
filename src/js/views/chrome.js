import Ractive from "ractive";

import Templates from "../Templates.js";

var ChromeView = Ractive.extend( {
    "template": Templates.getView( "chrome" ),
    data(){
        return {};
    },
    "components": {},

    onrender(){
        this.redraw();
    },
    oninsert(){
        this.redraw();
    },

    redraw(){}
} );

export default ChromeView;
