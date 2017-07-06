import Router from "./js/common/routing/Router.js";

import Store from "./js/Store.js";

window[ window.ns ].store = Store.init();
Store.registerAllControllers( window[ window.ns ].store );

Router.init( ( strongbox ) => {
    window[ window.ns ].router = strongbox;

    strongbox();
} );
