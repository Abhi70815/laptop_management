import React from "react";
import './EmployeeForm.css'; // Import the CSS file

const EmployeeForm = ({ formData, setFormData, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="form">
      {["name", "email", "password", "department"].map((field) => (
        <input
          key={field}
          type={field === "password" ? "password" : "text"}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={(e) =>
            setFormData({ ...formData, [field]: e.target.value })
          }
          className="input"
          required
        />
      ))}
      <button type="submit" className="button">
        Add Employee
      </button>
    </form>
  );
};

export default EmployeeForm;