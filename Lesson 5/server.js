require('dotenv')
const http = require('http')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

const logEvents = require('./logEvents')
const EventEmitter = require('events')

// initialize object
const myEmitter = new EventEmitter()
myEmitter.on('log', (msg, fileName) => {logEvents(msg, fileName)})
const PORT = process.env.PORT || 3500

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(filePath)
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(rawData)

    } catch (err) {
        console.error(err)

        myEmitter.emit('log', `${err.name}: ${err.message}`, 'serverErrorLog.txt');


        response.statusCode = 500
        response.end()


    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'requestLog.txt');
    /*

    * BASIC REQUEST SERVER
        if(req.url === '/' || req.url === 'index.html'){

        res.status = 200

        // Setting the header to understand the response content-type
        res.setHeader('Content-Type', 'text/html')

        // Reading the html file to be served.
        filePath = path.join(__dirname, 'views', 'index.html')
        fs.readFile(filePath, 'utf-8', (err, data) => {
            // Send the data inside the file to the response.
            res.end(data);
        })
    }

    */

    const extension = path.extname(req.url)

    let contentType

    switch (extension) {
        case '.css':
            contentType = 'text/css'
            break;
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.json':
            contentType = 'text/json'
            break;
        case '.jpg':
            contentType = 'image/jpeg'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.txt':
            contentType = 'text/plain'
            break;
        default:
            contentType = 'text/html'
            break;
    }

    let filePath =
        contentType === 'text/html' && req.url === '/' ? // url is exactly '/'
            path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/' ? // url is a directory
                path.join(__dirname, 'views', req.url, 'index.html') // serving the index of that directory
                : contentType === 'text/html' ? // absoulte path to an html file
                    path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url) // absolute path to any file

    // if the request doesnt have the extension of the requested file
    // the below code makes .html extension not required.
    if (!extension && req.url.slice(-1) != '/') {
        console.log('run hua\n');
        filePath += '.html'
    }

    const fileExists = fs.existsSync(filePath)

    if (fileExists) {
        //serve the file
        serveFile(filePath, contentType, res)
    } else {
        // resource not found
        // this could be a 404 or this could be a 301 (redirect)

        // Handling redirects


        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page.html' });
                res.end()
                break;

            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' });
                res.end()
                break;
            default:
                // serve 404
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
        }

    }




})

server.listen(PORT, () => {
    console.log(`The server is running at port ${PORT}`);

})


