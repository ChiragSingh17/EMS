import { useState, useEffect } from "react";
import API from "../api/axios";

import Navbar from "../components/Navbar";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

function Home() {

  const [employees, setEmployees] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="dashboard">
      <Navbar />

      <main className="dashboard-shell">
        <section className="hero-card">
          <div>
            <p className="hero-eyebrow">HR Workspace</p>
            <h1>Manage your team with clarity and confidence.</h1>
            <p>Keep employee records, departments, and compensation details organized in a clean and polished dashboard.</p>
          </div>
          <div className="hero-stat">
            <strong>{employees.length}</strong>
            <span>Active employees</span>
          </div>
        </section>

        <div className="content-grid">
          <EmployeeForm
            selectedEmployee={selectedEmployee}
            fetchEmployees={fetchEmployees}
            clearSelection={() => setSelectedEmployee(null)}
          />

          <EmployeeList
            employees={employees}
            fetchEmployees={fetchEmployees}
            setSelectedEmployee={setSelectedEmployee}
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
