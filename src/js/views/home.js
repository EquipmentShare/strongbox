import Templates from "../Templates.js";

import translations from "../nls/views/home.js";

var HomeView = {
    "template": Templates.getView( "home" ),
    data(){
        return {
            translations
        };
    }
};

export default HomeView;
