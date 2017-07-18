import Ractive from "ractive";
import "../../static/fontawesome/js/fontawesome.js";
import "../../static/fontawesome/js/packs/brands.js";
import "../../static/fontawesome/js/packs/light.js";

import Templates from "../Templates.js";

var Icon = Ractive.extend( {
    "template": Templates.getComponent( "Icon" ),
    data(){
        return {
            "icon": "",
            "type": "light"
        };
    },
    "computed": {
        weight(){
            var type = this.get( "type" );
            var weights = {
                "light": "fal",
                "brand": "fab"
            };
            var weight = "fal";

            if( weights[ type ] ){
                weight = weights[ type ];
            }

            return weight;
        }
    }
} );

export default Icon;
