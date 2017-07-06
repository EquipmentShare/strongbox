export const TYPE = "ROUTE_CHANGE_UNHANDLED";
export function createRouteChangeUnhandled( context, errorInfo ){
    return {
        "type": TYPE,
        "context": context,
        "error": errorInfo
    };
}
