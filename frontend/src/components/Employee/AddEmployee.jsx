import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AddEmployee.css'; // Import the CSS file

const AddEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/employees", employee, {
        headers: { token: localStorage.getItem('token') },
      });
      alert("Employee added successfully!");
      navigate('/admin');
      setEmployee({ name: "", email: "", password: "", department: "" });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Add Employee</h1>
      <form onSubmit={handleSubmit} className="form">
        {["name", "email", "password", "department"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            name={field}
            value={employee[field]}
            onChange={handleChange}
            placeholder={`Enter ${field}`}
            className="input"
            required
          />
        ))}
        <button type="submit" className="button">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;