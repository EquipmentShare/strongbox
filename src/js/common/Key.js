var Key = {
    isPath( key = "" ){
        var path = false;

        if( typeof key == "string" && key.length > 0 ){
            path = key.slice( -1 ) == "/";
        }

        return path;
    }
};

export default Key;
