import Templates from "../Templates.js";

import translations from "../nls/views/error.js";

var ErrorView = {
    "template": Templates.getView( "error" ),
    "data": {
        translations
    },
};

export default ErrorView;
