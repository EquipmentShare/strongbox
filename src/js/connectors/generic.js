import Ajax from "../Ajax.js";

const PREFIX = "secret";
var GenericConnector;

function stripPrefix( path ){
    var parts;

    if( typeof path == "string" ){
        parts = path.split( "/" );

        if( parts[ 0 ] == PREFIX ){
            path = parts.slice( 1 ).join( "/" );
        }
        else{
            path = parts.join( "/" );
        }
    }

    return path;
}

GenericConnector = {
    read( path = "" ){
        return this.sendToVault( {
            "method": "get",
            "url": `/secret/${stripPrefix( path )}`
        } );
    },
    list( path = "" ){
        return this.sendToVault( {
            "method": "list",
            "url": `/secret/${stripPrefix( path )}`
        } );
    }
};

Object.setPrototypeOf( GenericConnector, Ajax );

export default GenericConnector;
