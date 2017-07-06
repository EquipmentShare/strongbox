import Routes from "../../routing/Routes.js";

export default function redirectAction( router, definition ){
    var routeName = definition.route;
    var newRoute = Routes.getClientRoute( routeName );

    router.redirect( newRoute );
}
