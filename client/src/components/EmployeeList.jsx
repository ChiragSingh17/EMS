import API from "../api/axios";

function EmployeeList({
  employees,
  fetchEmployees,
  setSelectedEmployee,
}) {

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete Employee?")) return;

    await API.delete(`/employees/${id}`);

    fetchEmployees();
  };

  if (!employees.length) {
    return (
      <section className="card table-card empty-state">
        <h3>No employees added yet</h3>
        <p>Start by adding your first team member to the form.</p>
      </section>
    );
  }

  return (
    <section className="card table-card">
      <div className="card-heading">
        <h3>Employee roster</h3>
        <p>Track your team with a polished overview.</p>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>
                <td>${Number(emp.salary || 0).toLocaleString()}</td>
                <td>
                  <div className="action-group">
                    <button className="secondary-button" onClick={() => setSelectedEmployee(emp)}>
                      Edit
                    </button>
                    <button className="danger-button" onClick={() => deleteEmployee(emp._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default EmployeeList;
