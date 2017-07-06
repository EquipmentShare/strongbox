export const TYPE = "ROUTE_CHANGE";
export function createRouteChange( context ){
    return {
        "type": TYPE,
        "context": context
    };
}
