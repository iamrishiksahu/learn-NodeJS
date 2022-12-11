const express = require('express')
require('dotenv').config()
const path = require('path')
const {logEvents, logger} = require('./middleware/logEvents')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const cookiePasrser = require('cookie-parser')
const verifyJWT = require('./middleware/verifyJWT');
const corsOption = require('./config/corsConfig');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbCon');

const PORT = process.env.PORT || 3500
const app = express();
 
// Connecting to Databse
connectDB();

/** Express Handles Routes & Middlewares in a Top to Bottom manner */

/** Custom Middleware to Log each and every request*/
app.use(logger) //passing the logger function inside the middleware to handle the situation in some other file

/** Handle options credential check - before CORS
 * and fetch cookies credentail requirements. */
app.use(credentials)

/** Cross origin resource sharing */
app.use(cors(corsOption))

// builtin middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-wwww-form-urlencoded'
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

// Middleware for cookies
app.use(cookiePasrser())

// to serve static files
app.use('/', express.static(path.join(__dirname, '/public')))
    

/** Assigning a router for subdirectories */
app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

/** This is will force any route after this to go through the JWT authentication
 * 
 * Hence, The user need to get authenticated even to visit 404
 * So we need to make a special super route for accessing protected routes like: 
 * /user/  or  /api/  something like this to identify which routes are to be protected
 * 
 * for that: app.use('/user', verifyJWT)
 * 
 * Now rest other routes below it shall not be required to be authenticated.
 */

app.use(verifyJWT);
//Everything after this line will use verfiyJWT first before doing anything
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


// We want to listen for requests only if we have succesfully connected to the database.
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
        console.log(`The server is running at port ${PORT}`);
    })
})


