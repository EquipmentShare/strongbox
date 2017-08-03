import Ajax from "../Ajax.js";

// const PREFIX = "secret/";
var GenericConnector;

// function stripPrefix( path ){
//     var parts;
//
//     if( typeof path == "string" ){
//         parts = path.split( "/" );
//
//         if( parts[ 0 ] == PREFIX ){
//             path = parts.slice( 1 ).join( "/" );
//         }
//         else{
//             path = parts.join( "/" );
//         }
//     }
//
//     return path;
// }

GenericConnector = {
    read( path = "" ){
        // return this.
        //     sendToVault( {
        //         "method": "get",
        //         "url": `/secret/${stripPrefix( path )}`
        //     } );

        var payloads = {
            "secret/foo": {
                "prop": "foo"
            },
            "secret/keys/stuff": {
                "prop": "stuff"
            },
            "secret/keys/things": {
                "prop": "things"
            },
            "secret/keys/more/friend": {
                "prop": "friend"
            },
            "secret/keys/hello/there": {
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
        //         "url": `/secret/${stripPrefix( path )}`
        //     } );

        var payloads = {
            "default": {
                "keys": [ "foo", "keys/" ]
            },
            "secret/keys/": {
                "keys": [ "hello/", "stuff", "things", "more/" ]
            },
            "secret/keys/hello/": {
                "keys": [ "there" ]
            },
            "secret/keys/more/": {
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

        if( payloads[ path ] || path == "" || path == "secret" || path == "secret/" ){
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
