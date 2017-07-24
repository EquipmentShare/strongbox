export const TYPE = "MAIN_MENU_TOGGLE";
export function createMainMenuToggle( collapsed ){
    return {
        "type": TYPE,
        "collapsed": collapsed
    };
}
