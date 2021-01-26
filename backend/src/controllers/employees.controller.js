const employeeController = {};

const Employee = require('../models/Employee');

employeeController.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
};

employeeController.createEmployee = async (req, res) => {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.send({ message: 'Employee Created' });
};

employeeController.getEmployee = async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    res.send(employee);
};

employeeController.updateEmployee = async (req, res) => {
    await Employee.findByIdAndUpdate(req.params.id, req.body);
    res.send({ status: 'Employee Updated' });
};

employeeController.deleteEmployee = async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.send({ status: 'Employee Deleted' });
};

module.exports = employeeController;
