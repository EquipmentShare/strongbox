import Storage from "./Storage";

var Chrome = {
    prepare( definition ){
        Storage.set( "strongbox.menus.main.active", definition.menu );
        window.document.title = definition.title ? `${definition.title} ❚ Strongbox` : "Strongbox";
    }
};

export default Chrome;
