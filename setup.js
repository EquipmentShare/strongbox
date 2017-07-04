/* global process */
/* eslint "no-console": "off" */

var chalk = require( "chalk" );
var clear = require( "clear" );
var figlet = require( "figlet" );
var inquirer = require( "inquirer" );

var fs = require( "fs" );
var path = require( "path" );

var questions = [
    {
        "name": "endpoint",
        "type": "input",
        "message": "Enter the vault instance this app will connect to: "
    }
];

function fixEndpoint( endpoint ){
    var pre = endpoint;

    if( endpoint.substr( -1 ) == "/" ){
        endpoint = endpoint.slice( 0, -1 );
    }

    console.log( chalk.yellow( `\t- Got '${pre}', normalizing to '${endpoint}'` ) );

    return endpoint;
}

function fixResponses( responses ){
    console.log( chalk.green( "Checking for some potential problems..." ) );

    return {
        "vault": fixEndpoint( responses.endpoint )
    };
}

function writeConfigToApp( settings ){
    var s = path.sep;
    var dir = path.join( process.cwd(), `${s}src${s}content${s}data` );
    var confFile = path.join( dir, "config.json" );
    var config = JSON.stringify( settings, null, 4 );

    fs.writeFile( confFile, config, ( e ) => {
        if( e ){
            console.log(
                chalk.red( e )
            );
        }
        else{
            console.log( chalk.green( `\nWrote the following config to .${confFile.replace( process.cwd(), "" )}:` ) );
            console.log( config );
            console.log( chalk.blue( "\nYour instance of Strongbox is now ready to use." ) );
        }
    } );
}

clear();

console.log( // eslint-disable-line
    chalk.rgb( 69, 47, 4 )(
        figlet.textSync( "Strongbox", { "horizontalLayout": "full" } )
    )
);

inquirer
    .prompt( questions )
    .then( ( responses ) => {
        writeConfigToApp( fixResponses( responses ) );
    } );
