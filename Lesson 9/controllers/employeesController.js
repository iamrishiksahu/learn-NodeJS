
const data = {
    employees : require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
}



const getAllEmployees = (req, res) => {
    res.json(data.employees)
}

const createANewEmployee = (req, res) => {

    // creating the new employee object
    const newEmployee = {
        id: data.employees[data.employees.length -1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if(!newEmployee.firstname || !newEmployee.lastname){
        return res.staus(400).json({'message' : 'Firsts and last names are required!'})
    }

    data.setEmployees([...data.employees, newEmployee])
    res.status(201).json(data.employees)
}

const updateEmployee = (req, res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    })
}

const deleteEmployee = (req, res) => {
    res.json({
        "id": req.body.id
    })
}

const getEmployee = (req, res) => {
    res.json({
        "id": req.params.id
    })
}

module.exports = { getEmployee, getAllEmployees, createANewEmployee, updateEmployee, deleteEmployee }