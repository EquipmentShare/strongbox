import forEach from "lodash/fp/forEach";
import has from "lodash/fp/has";

function resolveLanguages( navigator ){
    return ( navigator.languages && navigator.languages[ 0 ] ) || navigator.language || navigator.userLanguage;
}

function I18n( config = { "locale": "en" } ){
    function resolveLocale(){
        return typeof navigator === "undefined" ? false : resolveLanguages( navigator );
    }

    this.locale = resolveLocale();
    this.config = config;
}

I18n.prototype.loadDefinitions = function loadDefinitions( definition ){
    this.translations = definition;
};

I18n.prototype.localize = function localize(){
    var response = {};
    var emergencyFallback = this.config.locale;
    var tag = this.locale || emergencyFallback;
    var parts = tag.split( "-" );
    var tags;

    function generateIncreasinglySpecificLanguageTags( partsParam ){
        var thisTags = [];
        var i = 0;
        var ending;

        for( i; i < partsParam.length; i++ ){
            ending = undefined;

            if( partsParam.length - 1 > i ){
                ending = i - -1;
            }

            thisTags.push( partsParam.slice( 0, ending ).join( "-" ) );
        }

        return thisTags;
    }

    function checkForStarName( resp ){
        var names = Object.keys( resp );
        var newResponse = resp;

        if( names.length == 1 && names[ 0 ] == "*" ){
            newResponse = resp[ "*" ];
        }

        return newResponse;
    }

    tags = generateIncreasinglySpecificLanguageTags( parts );

    forEach(
        ( name ) => {
            let def = this.translations[ name ];

            response[ name ] = def[ emergencyFallback ];

            forEach(
                ( specificTag ) => {
                    if( has( specificTag, def ) ){
                        response[ name ] = def[ specificTag ];
                    }
                },
                tags
            );
        },
        Object.keys( this.translations )
    );

    response = checkForStarName( response );

    return response;
};

export default I18n;
