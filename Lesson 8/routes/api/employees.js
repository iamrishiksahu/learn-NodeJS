const express = require('express');
const router = express.Router()
const path = require('path');


const data = {}
data.employees = require('../../data/employees.json');


/** We can chain http requests inside a same route */
router.route('/')
    .get( (req, res) => {
        res.json(data.employees)
    })
    .post( (req, res) => {
        // we can refer to the parameters coming through the request by using req.body.parameter_name
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .put((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .delete((req, res) => {
        res.json({
            "id": req.body.id
        })
    })


    // Handling the named URL parameter
router.route('/:id')
    .get((req, res) => {
        res.json({
            "id" : req.params.id
        })
    })
module.exports = router
