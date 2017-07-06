import Bridge from "../common/routing/AppRouterBridge.js";

import SecretsRoutes from "../../content/routes/secrets.json";

function CoreRoutesLoader( router ){
    var names = Object.keys( SecretsRoutes );
    var mapped = names.map(
        ( name ) => Object.assign( { "name": name }, SecretsRoutes[ name ] )
    );

    mapped.forEach( ( definition ) => {
        let path = definition.route;

        router(
            RegExp( `^${path}(?:/)?$` ),
            Bridge.steps.injectDefinitionStep.bind( definition ),
            Bridge.steps.enforcePermissionsStep.bind( router ),
            Bridge.steps.setupChromeStep,
            Bridge.steps.actionStep
        );
    } );
}

export default CoreRoutesLoader;
