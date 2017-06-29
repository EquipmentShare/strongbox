import LocalStorageStrategy from "./strategies/LocalStorageStrategy.js";
import RuntimeStorageStrategy from "./strategies/RuntimeStorageStrategy.js";

var Storage;

function getStorageStrategy(){
    return LocalStorageStrategy;
}

Storage = {
    "get": getStorageStrategy().get,
    "set": getStorageStrategy().set,
    "remove": getStorageStrategy().remove,
    "Session": RuntimeStorageStrategy
};

export default Storage;
