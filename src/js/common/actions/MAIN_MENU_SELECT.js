export const TYPE = "MAIN_MENU_SELECT";
export function createMainMenuSelect( item ){
    return {
        "type": TYPE,
        "selected": item
    };
}
