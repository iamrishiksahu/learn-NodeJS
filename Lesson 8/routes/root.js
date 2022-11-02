const router = require('express').Router()
const path = require('path')

router.get('^/$|/index(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

// writing in regEx that if html is present or not, consider both of them to be same
router.get('/new-page(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'views', 'new-page.html'))
})

router.get('/old-page(.html)?', (req, res) => {
    res.status(301).redirect(301, '/new-page.html') // default redirect is 302 in express redirect()
})

router.get('/hello(.html)?', (req, res, next) => {
    console.log('Attempted to load hello.html');
    next()
}, (req, res) => {
    res.send('Hellow World!')
})

// app.get('/hello.(html)?', [func1, func2, func3])
// All the above functions will be called sequentially



module.exports = router