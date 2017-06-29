import I18n from "../../I18n.js";
import error from "../../../content/nls/views/error.json";

var i18n = new I18n();

i18n.loadDefinitions( { "*": error } );

export default i18n.localize();
