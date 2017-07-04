import Storage from "./Storage.js";

var Security;

Security = {
    getSession(){
        var sess;

        sess = Storage.Cookies.get( "strongbox" );

        if( sess ){
            sess = JSON.parse( atob( sess ) );
        }
        else{
            sess = {};
        }

        return sess;
    },
    setSession( data ){
        Storage.Cookies.set( "strongbox", btoa( JSON.stringify( data ) ) );
    },
    endSession(){
        Storage.Cookies.remove( "strongbox" );
    },

    isSecureProtocol( uri ){
        var consideredSecure = [
            "https:"
        ];
        var isSecure = false;

        consideredSecure.forEach( ( proto ) => {
            let seemsSecure = String( uri ).indexOf( proto ) == 0;

            isSecure = isSecure || seemsSecure;
        } );

        return isSecure;
    }
};

/** The Security object */
export default Security;
