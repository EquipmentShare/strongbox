import Ractive from "ractive";

export var helpers = {
    isInstance( maybe ){
        return maybe instanceof Ractive;
    },
    isComponent( maybe ){
        var isFunc = typeof maybe == "function";

        return isFunc ? Ractive.prototype.isPrototypeOf( maybe.prototype ) : false;
    }
};

export default Ractive;
