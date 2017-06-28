var http = require( "http" );
var url = require( "url" );
var path = require( "path" );
var fs = require( "fs" );

var port = process.argv[ 2 ] || 8020;
var cwd = process.cwd();
var root = cwd + "/public/";

var contentTypes = {
    ".html": "text/html"
};

function getContentType( p ){
    var content = contentTypes[ path.extname( p ) ];

    if( content ){
        content = { "Content-Type": content };
    }

    return content;
}

function serveFile( p, response ){
    fs.readFile(
        p,
        "binary",
        ( err, file ) => {
            if( err ){
                response.writeHead( 500, { "Content-Type": "text/plain" } );
                response.write( err + "\n" );
                response.end();
            }
            else{
                let content = getContentType( p ) || "binary";
                let relativePath = p.replace( cwd, "" );

                /* eslint no-console: "off", no-debugger: "off", vars-on-top: "off", "no-unused-vars": "off" */
                console.log( ` <== .${relativePath}` );

                response.writeHead( 200 );
                response.write( file, content );
                response.end();
            }
        }
    );
}

function notFound( p, response ){
    response.writeHead( 404 );
    response.end();
}

function strongboxHandler( uri, response, request ){
    var filename = path.join( root, uri );

    fs.access( filename, ( err ) => {
        if( err ){
            filename = path.join( root, "/index.html" );
            serveFile( filename, response );
        }
        else if( fs.statSync( filename ).isDirectory() ){
            strongboxHandler( path.join( filename, "/index.html" ), response, request );
        }
        else{
            serveFile( filename, response );
        }
    } );
}

function serve( request, response ){
    var uri = url.parse( request.url ).pathname;

    console.log( `==>  ${uri}` );
    strongboxHandler( uri, response, request );
}

console.log( "Creating a server..." );

http
    .createServer( serve )
    .listen( parseInt( port, 10 ) );

console.log( `Listening on :${port}` );
