import LocalStorageStrategy from "./common/strategies/LocalStorageStrategy.js";
import RuntimeStorageStrategy from "./common/strategies/RuntimeStorageStrategy.js";
import CookieStorageStrategy from "./common/strategies/CookieStorageStrategy.js";

var Storage;

function getStorageStrategy(){
    return LocalStorageStrategy;
}

Storage = {
    "get": getStorageStrategy().get,
    "set": getStorageStrategy().set,
    "remove": getStorageStrategy().remove,
    "Cookies": CookieStorageStrategy,
    "Session": RuntimeStorageStrategy
};

export default Storage;
