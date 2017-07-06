import Bridge from "../common/routing/AppRouterBridge.js";

import CoreRoutes from "../../content/routes/core.json";

function CoreRoutesLoader( router ){
    var names = Object.keys( CoreRoutes );
    var mapped = names.map(
        ( name ) => Object.assign( { "name": name }, CoreRoutes[ name ] )
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
