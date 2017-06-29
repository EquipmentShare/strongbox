var http = require( "http" );
var url = require( "url" );
var path = require( "path" );
var fs = require( "fs" );

var port = process.argv[ 2 ] || 8020;
var cwd = process.cwd();

var root = path.join( cwd, "/public/" );

var contentTypes = {
    ".html": "text/html"
};

function getFile( uri ){
    var file = uri;

    if( !file || file == "/" ){
        file = "index.html";
    }

    return file;
}

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

                /* eslint no-console: "off", no-debugger: "off", vars-on-top: "off", "no-unused-vars": "off" */
                console.log( `<== .${p}` );

                response.writeHead( 200 );
                response.write( file, content );
                response.end();
            }
        }
    );
}

function handleRequest( p, response, request ){
    fs.access( p, ( error ) => {
        if( error ){
            p = path.join( root, "/index.html" );

            serveFile( p, response );
        }
        else{
            serveFile( p, response );
        }
    } );
}

function notFound( p, response ){
    response.writeHead( 404 );
    response.end();
}

function serve( request, response ){
    var uri = url.parse( request.url ).pathname;
    var file = getFile( uri );
    var filename = path.join( root, file );

    console.log( `==> ${uri}` );
    handleRequest( filename, response, request );
}

console.log( "Creating a server..." );

http
    .createServer( serve )
    .listen( parseInt( port, 10 ) );

console.log( `Listening on :${port}` );
