import String from "./String.js";
import View from "./View.js";

var Controller = {
    runAction( action = "default", context = {} ){
        this[ `action${String.uppercaseFirst( action )}` ]( context );
    },
    unloadView(){
        View.unload();
    },
    loadView( view, ctx ){
        return View.load( view, ctx );
    },
    create( props ){
        return Object.assign( Object.create( Controller ), props );
    }
};

export default Controller;
