const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 3500
const app = express();

/** Express Handles Routes in a Top to Bottom manner */

// the URL parameter of express supports regEx
app.get('/', (req, res) =>{
    res.status(200).sendFile(path,join(__dirname, 'views', 'index.html'))
})

// writing in regEx that if html is present or not, consider both of them to be same
app.get('/new-page(.html)?', (req, res) =>{
    res.status(200).sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page(.html)?', (req, res) =>{
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

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => {
    console.log(`The server is running at port ${PORT}`);

})