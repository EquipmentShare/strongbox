import Chrome from "../../Chrome.js";
import Error from "../../Error.js";
import State from "../../State.js";

var Bridge = {
    "appState": {
        "get": State.get,
        "set": State.set
    },
    "steps": {
        injectDefinitionStep( context, next ){
            context.definition = this;

            next();
        },
        setupChromeStep( context, next ){
            var definition = context.definition;

            Chrome.prepare( definition );

            next();
        },
        loadAppStateStep( context, next ){
            context.appState = State.get();


            next();
        },
        actionStep( context, next ){
            try{
                context.definition.controller.runAction(
                    context.definition.action,
                    {
                        "meta": {
                            "app": context,
                            "verb": context.verb,
                            "route": context.path
                        },
                        "params": context.params,
                        "definition": context.definition
                    }
                );
            }
            catch( any ){
                Error.emit( "Caught an error while processing route", any, context );
                next();
            }
        }
    }
};

export default Bridge;
