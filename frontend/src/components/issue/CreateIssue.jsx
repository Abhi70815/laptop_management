import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CreateIssue.css'; // Import the CSS file

const CreateIssue = () => {
  const navigate = useNavigate();
  const [laptops, setLaptops] = useState([]);
  const [issue, setIssue] = useState({
    laptopId: "",
    description: "",
    priority: "Low",
    reportedBy: ""
  });

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const res = await axios.get("https://laptop-management-backend-tjrg.onrender.com/api/laptops", {
          headers: { token: localStorage.getItem("token") },
        });
        setLaptops(res.data);
      } catch (error) {
        console.error("Error fetching laptops:", error);
      }
    };

    fetchLaptops();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssue({ ...issue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://laptop-management-backend-tjrg.onrender.com/api/issues", issue, {
        headers: { token: localStorage.getItem('token') }
      });
      alert("Issue created successfully!");
      navigate('/admin');
      setIssue({ laptopId: "", description: "", priority: "Low", reportedBy: "" });
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Create Issue</h1>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label className="label">Enter Name</label>
          <input
            name="reportedBy"
            className="input"
            type="text"
            value={issue.reportedBy}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label">Select Laptop</label>
          <select
            name="laptopId"
            value={issue.laptopId}
            onChange={handleChange}
            className="select"
            required
          >
            <option value="">-- Select a Laptop --</option>
            {laptops.map((laptop) => (
              <option key={laptop._id} value={laptop._id}>
                {laptop.brand} {laptop.model} ({laptop.serialNumber})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Issue Description</label>
          <textarea
            name="description"
            value={issue.description}
            onChange={handleChange}
            placeholder="Describe the issue"
            className="textarea"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="label">Priority Level</label>
          <select
            name="priority"
            value={issue.priority}
            onChange={handleChange}
            className="select"
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button type="submit" className="button">
          Create Issue
        </button>
      </form>
    </div>
  );
};

export default CreateIssue;