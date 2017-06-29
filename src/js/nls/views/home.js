import I18n from "../../I18n.js";
import home from "../../../content/nls/views/home.json";

var i18n = new I18n();

i18n.loadDefinitions( { "*": home } );

export default i18n.localize();
