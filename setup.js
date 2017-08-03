/* global process */
/* eslint "no-console": "off" */

var chalk = require( "chalk" );
var clear = require( "clear" );
var figlet = require( "figlet" );
var inquirer = require( "inquirer" );

var fs = require( "fs" );
var path = require( "path" );

var fullSeparator = "-----------------------------------";

var questions = [
    {
        "name": "endpoint",
        "type": "input",
        "message": "Enter the vault instance this app will connect to: "
    },
    {
        "name": "secrets",
        "type": "checkbox",
        "message": "Choose which secret backends to enable: ",
        "default": [ "generic" ],
        "choices": [ "generic" ]
    },
    {
        "name": "auths",
        "type": "checkbox",
        "message": "Choose which auth backends to enable: ",
        "default": [ "LDAP" ],
        "choices": [ "LDAP" ]
    }
];

function secretsFollowup( backend ){
    var mounts = {
        "generic": "secret/"
    };

    return {
        "name": `${backend}`,
        "type": "input",
        "message": `Enter the mount point for the ${backend} secret backend: `,
        "default": mounts[ backend ] || ""
    };
}

function fixEndpoint( endpoint ){
    var pre = endpoint;

    if( endpoint.substr( -1 ) == "/" ){
        endpoint = endpoint.slice( 0, -1 );
        console.log( chalk.yellow( `\t- Got '${pre}', normalizing to '${endpoint}'` ) );
    }

    return endpoint;
}

function fixResponses( responses ){
    console.log( chalk.green( "Checking for some potential problems..." ) );

    return {
        "vault": fixEndpoint( responses.endpoint ),
        "secrets": responses.secrets,
        "auths": responses.auths
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
        let mounts = responses.secrets.map( secretsFollowup );

        console.log( fullSeparator );

        inquirer
            .prompt( mounts )
            .then( ( mountPoints ) => {
                let merged = {};

                responses.secrets.forEach( ( backend ) => {
                    merged[ backend ] = mountPoints[ backend ];
                } );

                responses.secrets = merged;

                writeConfigToApp( fixResponses( responses ) );
            } );
    } );
