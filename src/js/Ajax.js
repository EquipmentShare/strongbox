import Authentication from "./Authentication.js";
import System from "./System";

var Ajax;

function addBearerToken( headers ){
    var apiToken = Authentication.getToken();

    headers[ "X-Vault-Token" ] = apiToken;

    return headers;
}

Ajax = {
    send( options ){
        var url = options.url;
        var content = options.data;

        delete options.url;
        delete options.data;

        options.headers = new Headers( options.headers );
        if( content ){
            options.body = content;
        }

        return fetch( url, options );
    },
    sendToVault( options ){
        var settings = System.getSettings();

        options.headers = addBearerToken( options.headers || {} );
        options.url =  `${settings.vault}${settings.version}${options.url}`;

        return Ajax.send( options );
    }
};

export default Ajax;
