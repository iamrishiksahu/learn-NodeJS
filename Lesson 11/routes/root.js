const router = require('express').Router()
const path = require('path')

router.get('^/$|/index(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'views', 'index.html'))
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