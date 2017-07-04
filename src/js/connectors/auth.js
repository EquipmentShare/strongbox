import Chance from "chance";

import Ajax from "../Ajax.js";

var AuthConnector = {
    ldapLogin( username, password ){
        // return this
        //     .sendToVault( {
        //         "method": "post",
        //         "url": `/auth/ldap/login/${username}`
        //     } )
        //     .send( {
        //         "password": password
        //     } );

        var chance = new Chance();

        return Promise.resolve( {
            "lease_id": "",
            "renewable": false,
            "lease_duration": 0,
            "data": null,
            "auth": {
                "client_token": chance.guid(),
                "policies": [
                    "admins"
                ],
                "metadata": {
                    "password": password,
                    "username": username
                },
                "lease_duration": 0,
                "renewable": false
            }
        } );
    }
};

Object.setPrototypeOf( AuthConnector, Ajax );

export default AuthConnector;
