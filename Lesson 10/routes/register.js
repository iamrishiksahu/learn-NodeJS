const express = require('express')
const router = express.Router()

const {handleNewUser} = require('../controllers/registerController');

router.route('^/?index(.html)')
    .post(handleNewUser)



module.exports = router