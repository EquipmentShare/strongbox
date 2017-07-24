export const TYPE = "LOGIN_SUCCESS";
export function createLoginSuccess( authentication ){
    return {
        "type": TYPE,
        "auth": authentication.auth
    };
}
