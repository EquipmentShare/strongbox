export const TYPE = "LOG_ACTION";
export function createLogAction( action, currentState ){
    return {
        "type": TYPE,
        "action": action,
        "state": currentState
    };
}
