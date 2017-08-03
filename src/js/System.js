import config from "../content/data/config.json";

var System = {
    getSettings(){
        return {
            "vault": config.vault,
            "backends": config.secrets,
            "auths": config.auths
        };
    }
};

export default System;
