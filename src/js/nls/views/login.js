import I18n from "../../I18n.js";
import login from "../../../content/nls/views/login.json";

var i18n = new I18n();

i18n.loadDefinitions( { "*": login } );

export default i18n.localize();
