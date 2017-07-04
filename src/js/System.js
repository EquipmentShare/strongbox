import config from "../content/data/config.json";

var System = {
    getSettings(){
        return {
            "vault": config.vault
        };
    }
};

export default System;
