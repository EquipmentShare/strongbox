import Store from "./Store.js";

import { createMainMenuSelect } from "./common/actions/MAIN_MENU_SELECT.js";

var Chrome = {
    prepare( definition ){
        Store.dispatch( createMainMenuSelect( definition.menu ) );
        window.document.title = definition.title ? `${definition.title} ❚ Strongbox` : "Strongbox";
    }
};

export default Chrome;
