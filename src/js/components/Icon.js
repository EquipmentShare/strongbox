import Ractive from "ractive";

import Templates from "../Templates.js";

var Icon = Ractive.extend( {
    "template": Templates.getComponent( "Icon" ),
    data(){
        return {
            "icon": "",
            "type": "light"
        };
    }
} );

export default Icon;
