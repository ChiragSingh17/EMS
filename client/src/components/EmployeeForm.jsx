import { useState, useEffect } from "react";
import API from "../api/axios";

function EmployeeForm({ selectedEmployee, fetchEmployees, clearSelection }) {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
  });

  useEffect(() => {
    if (selectedEmployee) {
      setEmployee(selectedEmployee);
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...employee,
        salary: Number(employee.salary),
      };

      if (selectedEmployee) {
        await API.put(`/employees/${selectedEmployee._id}`, payload);
      } else {
        await API.post("/employees", payload);
      }

      fetchEmployees();

      setEmployee({
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
      });

      clearSelection();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="card form-card">
      <div className="card-heading">
        <h3>{selectedEmployee ? "Edit employee" : "Add new employee"}</h3>
        <p>Capture key details in one place.</p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={employee.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={employee.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={employee.phone} onChange={handleChange} required />
        <input name="department" placeholder="Department" value={employee.department} onChange={handleChange} required />
        <input name="designation" placeholder="Designation" value={employee.designation} onChange={handleChange} required />
        <input name="salary" type="number" placeholder="Salary" value={employee.salary} onChange={handleChange} required />

        <button className="primary-button">
          {selectedEmployee ? "Update Employee" : "Add Employee"}
        </button>
      </form>
    </section>
  );
}

export default EmployeeForm;