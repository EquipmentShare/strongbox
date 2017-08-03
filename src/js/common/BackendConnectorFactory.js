import Generic from "../connectors/generic.js";

export default function BackendConnectorFactory( key ){
    var connectors = {
        "secret": Generic
    };
    var parts = [];
    var connector;

    if( typeof key == "string" && key.length > 0 ){
        parts = key.split( "/" );
    }

    if( parts.length ){
        connector = connectors[ parts[ 0 ] ];
    }

    return connector;
}
