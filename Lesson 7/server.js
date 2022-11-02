const express = require('express')
const path = require('path')
const {logEvents, logger} = require('./middleware/logEvents')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')

const PORT = process.env.PORT || 3500
const app = express();

/** Express Handles Routes & Middlewares in a Top to Bottom manner */

/** Custom Middleware to Log each and every request*/
app.use(logger) //passing the logger function inside the middleware to handle the situation in some other file

/** Cross origin resource sharing */
const whitelist = ['https://www.google.com', 'https://www.rishiksahu.in', 'http://localhost:3500']
const corsOption = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin ) {
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOption))

// builtin middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-wwww-form-urlencoded'
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

// to serve static files
app.use(express.static(path.join(__dirname, '/public')))

// the URL parameter of express supports regEx
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'))
})

// writing in regEx that if html is present or not, consider both of them to be same
app.get('/new-page(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page(.html)?', (req, res) => {
    res.status(301).redirect(301, '/new-page.html') // default redirect is 302 in express redirect()
})


/** ROUTE HANDLERS */

app.get('/hello(.html)?', (req, res, next) => {
    console.log('Attempted to load hello.html');
    next()
}, (req, res) => {
    res.send('Hellow World!')
})

// app.get('/hello.(html)?', [func1, func2, func3])
// All the above functions will be called sequentially

//This works as a middleware

// app.all() corresponds to all kind of requests
app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})


// We add the error handler middlware at the end
// because we want the other items in the series to see if they have any
// condition on which the current error could be catched or resolved.
// If nothing works above, we handle the error here
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`The server is running at port ${PORT}`);
})

