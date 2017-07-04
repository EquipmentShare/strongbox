import Ractive, { helpers as RactiveHelpers } from "./bootstrappers/ractive.js";

import Storage from "./Storage.js";

import ChromeView from "./views/chrome.js";

var View;
const ATTACH_POINT = document.getElementsByTagName( "body" )[ 0 ];

Ractive.DEBUG = false;

function getChromeComponent( attach = ATTACH_POINT ){
    var chrome = Storage.Session.get( "view.chrome" );

    if( !chrome ){
        chrome = ChromeView( {
            "el": attach
        } );
        Storage.Session.set( "view.chrome", chrome );
    }
    else{
        if( attach ){
            chrome.insert( attach );
        }
    }

    return chrome;
}

function getRenderableRactive( maybeRactive ){
    var renderable;

    if( RactiveHelpers.isComponent( maybeRactive ) ){
        renderable = maybeRactive;
    }
    else{
        renderable = Ractive.extend( {
            "template": "Empty fallback Ractive component"
        } );
    }

    return renderable;
}

View = {
    mount( view, mountPoint, name ){
        var newView;

        if( typeof view[ 0 ] != "object" ){
            newView = getRenderableRactive( view[ 0 ] )( {
                "mountContext": view[ 1 ]
            } );
        }
        else{
            view[ 0 ].mountContext = view[ 1 ];
            newView = Ractive( view[ 0 ] );
        }

        newView.render( mountPoint );

        if( name ){
            mountPoint.classList = `view ${name}`;
        }
        else{
            mountPoint.className = "view";
        }

        Storage.Session.set( "view.current", newView );

        return newView;
    },
    load( view, ctx ){
        var name = ctx ? ctx.definition.name : null;
        var chrome = getChromeComponent();

        View.unload();
        chrome.setMenu( ctx ? ctx.definition.menu : null );
        chrome.redraw();

        return View.mount( [ view, ctx ], chrome.find( ".view" ), name );
    },
    unload(){
        View.destroy( Storage.Session.get( "view.current" ) );

        Storage.Session.set( "view.current", null );
    },
    destroy( view ){
        if( view ){
            view.teardown();
        }
    }
};

export default View;
