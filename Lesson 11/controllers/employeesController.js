const Employee = require('../model/Employee');


const getAllEmployees = async (req, res) => {

    // All employees will be fetched if we just your find()
    const employees = await Employee.find();    

    if(employees) {
        return res.status(204).json({'message': 'No employees found!'})
    }

    return res.json(employees)
}

const createANewEmployee = async (req, res) => {

    // creating the new employee object

    if(!req?.body?.firstname || !req?.body?.lastname){
        return res.status(400).json({message: 'First and last names are required!'})
    }


    try{
        const result = await Employee.create({
            firstName: req.body.firstname,
            lastname: req.body.lastname
        })

        res.status(201).json(result)
    }catch(err){
        console.log(err);
    }


}

const updateEmployee = async (req, res) => {

    if(!req?.body?.id) {
        return res.status(400).json({message: 'ID parameter is required!'})
    }

    const employee = await Employee.findOne({_id: req.body.id}).exec();

    if(!employee){
        return res.status(204).json({"message" : `No employee mathces the ID: ${req.body.id}`});
    }

    if(req.body?.firstname) employee.firstname = req.body.firstname;
    if(req.body?.lastname) employee.lastname = req.body.lastname;

    const result = await employee.save();

    res.json(result);

}

const deleteEmployee = async (req, res) => {

    if(!req?.body?.id) return res.status(400).json({message: 'Employee ID is required!'});

    const employee = await Employee.findOne({_id: req.body.id}).exec();

    if(!employee){
        return res.status(204).json({"message" : `No employee mathces the ID: ${req.body.id}`});
    }

    const result = await employee.deleteOne({_id: req.body.id}); //exec is not needed

    res.json(result);
}

const getEmployee = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({message: 'Employee ID is required!'});

    const employee = await Employee.findOne({_id: req.params.id}).exec();

    if(!employee){
        return res.status(204).json({"message" : `No employee mathces the ID: ${req.params.id}`});
    }


    res.json(employee);
}

module.exports = { getEmployee, getAllEmployees, createANewEmployee, updateEmployee, deleteEmployee }