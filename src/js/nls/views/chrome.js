import I18n from "../../I18n.js";
import chrome from "../../../content/nls/views/chrome.json";

var i18n = new I18n();

i18n.loadDefinitions( { "*": chrome } );

export default i18n.localize();
