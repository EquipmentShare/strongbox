import ajax from "superagent/superagent.js";

import Authentication from "./Authentication.js";

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
        var vault = "vault://v1/";

        options.headers = addBearerToken( options.headers || {} );
        options.url =  `${vault}${options.url}`;

        return Ajax.send( options );
    }
};

export default Ajax;
