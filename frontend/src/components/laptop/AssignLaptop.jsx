import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AssignLaptop.css'; // Import the CSS file

const AssignLaptop = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [assignment, setAssignment] = useState({
    employeeId: "",
    laptopId: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("https://laptop-management-backend-tjrg.onrender.com/api/employees", {
          headers: { token: localStorage.getItem("token") },
        });
        setEmployees(res.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
    fetchLaptops();
  }, []);

  const fetchLaptops = async () => {
    try {
      const res = await axios.get("https://laptop-management-backend-tjrg.onrender.com/api/laptops", {
        headers: { token: localStorage.getItem("token") },
      });
      setLaptops(res.data.filter((laptop) => laptop.status === "available"));
    } catch (error) {
      console.error("Error fetching laptops:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment({ ...assignment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://laptop-management-backend-tjrg.onrender.com/api/assignments", assignment, {
        headers: { token: localStorage.getItem("token") },
      });
      fetchLaptops();
      navigate('/admin');
      setAssignment({ laptopId: "", employeeId: "" });
      alert("Laptop assigned successfully!");
    } catch (error) {
      console.error("Error assigning laptop:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Assign Laptop</h1>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label className="label">Select Employee</label>
          <select
            name="employeeId"
            value={assignment.employeeId}
            onChange={handleChange}
            className="select"
            required
          >
            <option value="">-- Select an Employee --</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name} ({employee.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Select Laptop</label>
          <select
            name="laptopId"
            value={assignment.laptopId}
            onChange={handleChange}
            className="select"
            required
          >
            <option value="">-- Select a Laptop --</option>
            {laptops.length > 0 ? (
              laptops.map((laptop) => (
                <option key={laptop._id} value={laptop._id}>
                  { laptop.brand} {laptop.model} ({laptop.serialNumber})
                </option>
              ))
            ) : (
              <option value="">No laptop is available to assign</option>
            )}
          </select>
        </div>

        <button type="submit" className="button">
          Assign Laptop
        </button>
      </form>
    </div>
  );
};

export default AssignLaptop;