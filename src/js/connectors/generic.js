import Ajax from "../Ajax.js";

var GenericConnector = {
    read( path = "" ){
        // return this.
        //     sendToVault( {
        //         "method": "get",
        //         "url": `/secret/${path}`
        //     } );

        var payloads = {
            "foo": {
                "prop": "foo"
            },
            "keys/stuff": {
                "prop": "stuff"
            },
            "keys/things": {
                "prop": "things"
            },
            "keys/more/friend": {
                "prop": "friend"
            },
            "keys/hello/there": {
                "prop": "there"
            }
        };
        var wrapper = {
            "auth": null,
            "data": null,
            "lease_duration": 2764800,
            "lease_id": "",
            "renewable": false
        };
        var response;

        if( payloads[ path ] ){
            wrapper.data = payloads[ path ];
            response = Promise.resolve( wrapper );
        }
        else{
            response = Promise.reject();
        }

        return response;
    },
    list( path = "" ){
        /* eslint "complexity": "off" */

        // return this
        //     .sendToVault( {
        //         "method": "list",
        //         "url": `/secret/${path}`
        //     } );

        var payloads = {
            "default": {
                "keys": [ "foo", "keys/" ]
            },
            "keys/": {
                "keys": [ "hello/", "stuff", "things", "more/" ]
            },
            "keys/hello/": {
                "keys": [ "there" ]
            },
            "keys/more/": {
                "keys": [ "friend" ]
            }
        };
        var wrapper = {
            "auth": null,
            "data": null,
            "lease_duration": 2764800,
            "lease_id": "",
            "renewable": false
        };
        var response;

        if( payloads[ path ] || path == "" ){
            wrapper.data = payloads[ path ] || payloads.default;
            response = Promise.resolve( wrapper );
        }
        else{
            response = Promise.reject();
        }

        return response;
    }
};

Object.setPrototypeOf( GenericConnector, Ajax );

export default GenericConnector;
