import ajax from "superagent/superagent.js";

import Authentication from "./Authentication.js";
import System from "./System";

var Ajax;

function addBearerToken( headers ){
    var apiToken = Authentication.getToken();

    headers.Authorization = `Bearer ${apiToken}`;

    return headers;
}

Ajax = {
    send( options ){
        return ajax[ options.method ]( options.url )
            .set( options.headers || {} )
            .send( options.data );
    },
    sendToVault( options ){
        var settings = System.getSettings();

        options.headers = addBearerToken( options.headers || {} );
        options.url =  `${settings.vault}${options.url}`;

        return Ajax.send( options );
    }
};

export default Ajax;
