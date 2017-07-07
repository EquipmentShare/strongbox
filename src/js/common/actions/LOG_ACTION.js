export const TYPE = "LOG_ACTION";
export function createLogAction( action ){
    return {
        "type": TYPE,
        "action": action
    };
}
