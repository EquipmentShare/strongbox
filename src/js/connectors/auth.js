import Ajax from "../Ajax.js";

var AuthConnector = {
    ldapLogin( username, password ){
        return this
            .sendToVault( {
                "method": "post",
                "url": `/auth/ldap/login/${username}`,
                "data": {
                    "password": password
                }
            } );
    }
};

Object.setPrototypeOf( AuthConnector, Ajax );

export default AuthConnector;
