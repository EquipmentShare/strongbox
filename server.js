var http = require( "http" );
var zlib = require( "zlib" );
var url = require( "url" );
var path = require( "path" );
var fs = require( "fs" );

var port = process.argv[ 2 ] || 8020;
var cwd = process.cwd();

var root = path.join( cwd, "/public/" );

var contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".svg": "image/svg+xml"
};

function getFile( uri ){
    var file = uri;

    if( !file || file == "/" ){
        file = "index.html";
    }

    return file;
}

function getContentType( p ){
    return contentTypes[ path.extname( p ) ];
}

function canCompress( request ){
    var accept = request.headers[ "accept-encoding" ] || "";

    return accept.match( /\b(?:gzip|deflate)\b/ );
}

function compression( request ){
    var enc = request.headers[ "accept-encoding" ] || "";
    var alg = false;

    if( /\bdeflate\b/.test( enc ) ){
        alg = "deflate";
    }
    else if( /\bgzip\b/.test( enc ) ){
        alg = "gzip";
    }

    return alg;
}

function serveFile( p, response, request ){
    fs.readFile(
        p,
        "utf8",
        ( err, file ) => {
            let shouldCompress = canCompress( request );
            let code = 200;
            let headers = {};
            let content = "";

            function finishStream( error, compressedResultBuffer, raw ){
                if( !error && !raw  ){
                    headers[ "Content-Encoding" ] = compression( request );
                    raw = compressedResultBuffer;
                }

                if( error ){
                    headers[ "Content-Type" ] = "text/plain";
                    raw = "compression error";
                }

                headers[ "Content-Length" ] = Buffer.byteLength( raw );

                response.writeHead( code, headers );
                response.end( raw, "utf8" );

                if( code == 200 ){
                    /* eslint no-console: "off", no-debugger: "off", vars-on-top: "off", "no-unused-vars": "off" */
                    console.log( `<== .${p}` );
                }
            }

            if( err ){
                headers[ "Content-Type" ] = "text/plain";
                code = 500;
                content = err + "\n";
            }
            else{
                headers[ "Content-Type" ] = getContentType( p );
                code = 200;
                content = file;
            }

            headers[ "Content-Type" ] += "; charset=utf-8";

            switch( compression( request ) ){
                case "gzip":
                    zlib.gzip( content, finishStream );
                    break;

                case "deflate":
                    zlib.deflate( content, finishStream );
                    break;

                default:
                    finishStream( null, null, content );
            }
        }
    );
}

function handleRequest( p, response, request ){
    fs.access( p, ( error ) => {
        if( error ){
            p = path.join( root, "/index.html" );
        }

        serveFile( p, response, request );
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
