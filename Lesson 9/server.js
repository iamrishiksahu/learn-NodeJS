const express = require('express')
const path = require('path')
const {logEvents, logger} = require('./middleware/logEvents')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const corsOption = require('./config/corsConfig');

const PORT = process.env.PORT || 3500
const app = express();

/** Express Handles Routes & Middlewares in a Top to Bottom manner */

/** Custom Middleware to Log each and every request*/
app.use(logger) //passing the logger function inside the middleware to handle the situation in some other file

/** Cross origin resource sharing */
app.use(cors(corsOption))

// builtin middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-wwww-form-urlencoded'
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

// to serve static files
app.use('/', express.static(path.join(__dirname, '/public')))
    

/** Assigning a router for subdirectories */
app.use('/', require('./routes/root'))
app.use('/employees', require('./routes/api/employees'))



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

