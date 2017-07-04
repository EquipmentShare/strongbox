import Bridge from "../common/routing/AppRouterBridge.js";

import HomeController from "../controllers/Home.js";
import AuthController from "../controllers/Auth.js";

import CoreRoutes from "../../content/routes/core.json";

var dynamicRouting = {
    "home": {
        "menu": "home",
        "controller": HomeController
    },
    "login": {
        "menu": "login",
        "action": "login",
        "controller": AuthController
    },
    "logout": {
        "menu": "login",
        "action": "logout",
        "controller": AuthController
    }
};

function CoreRoutesLoader( router ){
    var names = Object.keys( CoreRoutes );
    var merged = names.map( ( name ) => Object.assign( { "name": name }, dynamicRouting[ name ], CoreRoutes[ name ] ) );

    merged.forEach( ( definition ) => {
        let path = definition.route;

        router(
            RegExp( `^${path}(?:/)?$` ),
            Bridge.steps.injectDefinitionStep.bind( definition ),
            Bridge.steps.loadAppStateStep,
            Bridge.steps.setupChromeStep,
            Bridge.steps.actionStep
        );
    } );
}

export default CoreRoutesLoader;
