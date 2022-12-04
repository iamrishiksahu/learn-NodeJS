const express = require('express');
const router = express.Router()
const path = require('path');
const employeeController = require('../../controllers/employeesController');

/** We can chain http requests inside a same route */
router.route('/')
    .get(employeeController.getAllEmployees)
    .post(employeeController.createANewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee)


    // Handling the named URL parameter
router.route('/:id')
    .get(employeeController.getEmployee)

    
module.exports = router
