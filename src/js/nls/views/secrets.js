import I18n from "../../I18n.js";
import secrets from "../../../content/nls/views/secrets.json";

var i18n = new I18n();

i18n.loadDefinitions( { "*": secrets } );

export default i18n.localize();
