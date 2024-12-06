import React from "react";
import './employeeTable.css'; // Import the CSS file

const EmployeeTable = ({ employees, onRemove }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.department}</td>
            <td>
              <button
                onClick={() => onRemove(employee._id)}
                className="button"
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;