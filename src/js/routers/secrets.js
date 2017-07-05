import Bridge from "../common/routing/AppRouterBridge.js";

import SecretsController from "../controllers/Secrets.js";

import RedirectNotLoggedIn from "../../content/permissions/RedirectNotLoggedIn.json";
import SecretsRoutes from "../../content/routes/secrets.json";

var dynamicRouting = {
    "secrets": {
        "menu": "secrets",
        "controller": SecretsController,
        "permissions": [ RedirectNotLoggedIn ]
    }
};

function CoreRoutesLoader( router ){
    var names = Object.keys( SecretsRoutes );
    var merged = names.map( ( name ) => Object.assign( { "name": name }, dynamicRouting[ name ], SecretsRoutes[ name ] ) );

    merged.forEach( ( definition ) => {
        let path = definition.route;

        router(
            RegExp( `^${path}(?:/)?$` ),
            Bridge.steps.injectDefinitionStep.bind( definition ),
            Bridge.steps.enforcePermissionsStep.bind( router ),
            Bridge.steps.loadAppStateStep,
            Bridge.steps.setupChromeStep,
            Bridge.steps.actionStep
        );
    } );
}

export default CoreRoutesLoader;
