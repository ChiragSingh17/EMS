const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const memoryEmployees = [];
const isMongoConnected = () => mongoose.connection.readyState === 1;

const EmployeeModel = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

const Employee = {
  async find() {
    if (!isMongoConnected()) {
      return [...memoryEmployees].sort(
        (a, b) => new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0)
      );
    }

    return EmployeeModel.find();
  },

  async findById(id) {
    if (!isMongoConnected()) {
      return memoryEmployees.find((employee) => employee._id === id) || null;
    }

    return EmployeeModel.findById(id);
  },

  async create(data) {
    if (!isMongoConnected()) {
      const employee = {
        _id: `${Date.now()}`,
        ...data,
        salary: Number(data.salary),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      memoryEmployees.unshift(employee);
      return employee;
    }

    return EmployeeModel.create(data);
  },

  async findByIdAndUpdate(id, data) {
    if (!isMongoConnected()) {
      const index = memoryEmployees.findIndex((employee) => employee._id === id);

      if (index === -1) {
        return null;
      }

      const updatedEmployee = {
        ...memoryEmployees[index],
        ...data,
        salary: Number(data.salary ?? memoryEmployees[index].salary),
        updatedAt: new Date().toISOString(),
      };

      memoryEmployees[index] = updatedEmployee;
      return updatedEmployee;
    }

    return EmployeeModel.findByIdAndUpdate(id, data, { new: true });
  },

  async findByIdAndDelete(id) {
    if (!isMongoConnected()) {
      const index = memoryEmployees.findIndex((employee) => employee._id === id);

      if (index === -1) {
        return null;
      }

      const [deletedEmployee] = memoryEmployees.splice(index, 1);
      return deletedEmployee;
    }

    return EmployeeModel.findByIdAndDelete(id);
  },
};

module.exports = Employee;