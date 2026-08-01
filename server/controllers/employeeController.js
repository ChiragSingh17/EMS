const Employee = require("../models/Employee");

// GET All Employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    const sortedEmployees = [...employees].sort(
      (a, b) => new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0)
    );

    res.json(sortedEmployees);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// GET Single Employee
const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.json(employee);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// CREATE Employee
const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);

    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// UPDATE Employee
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.json(employee);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// DELETE Employee
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.json({
      message: "Employee deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};