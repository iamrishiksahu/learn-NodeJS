const express = require('express');
const router = express.Router()
const path = require('path');
const employeeController = require('../../controllers/employeesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

const verifyJWT = require('../../middleware/verifyJWT')

/** We can chain http requests inside a same route */
router.route('/')
    .get(employeeController.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.createANewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeeController.deleteEmployee)


    // Handling the named URL parameter
router.route('/:id')
    .get(employeeController.getEmployee)

    
module.exports = router
