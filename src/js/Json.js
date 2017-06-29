export default {
    parse( string ){
        var json = string;

        if( string && string != "" ){
            try{
                json = JSON.parse( string );
            }
            catch( error ){
                json = string;
            }
        }

        return json;
    }
};
