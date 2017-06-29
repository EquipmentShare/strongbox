import route from "page";

import * as StrongboxRouter from "./js/routers/strongbox.js";
import CoreRouter from "./js/routers/core.js";

var strongbox = route;
var loaded = 0;
var routers = [
    CoreRouter
];

window[ window.ns ].router = strongbox;

routers.forEach( ( router ) => {
    router( strongbox );

    loaded++;

    if( loaded == routers.length ){
        StrongboxRouter.after( strongbox );

        strongbox();
    }
} );
