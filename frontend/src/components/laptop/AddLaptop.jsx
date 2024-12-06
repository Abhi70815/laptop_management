import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AddLaptop.css'; // Import the CSS file
import { useAuth } from "../../contexts/AuthContext";

const AddLaptop = () => {
  const navigate = useNavigate();
  const { fetchLaptops } = useAuth();
  const [laptop, setLaptop] = useState({
    brand: "",
    model: "",
    serialNumber: "",
    purchaseDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLaptop({ ...laptop, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/laptops", laptop, {
        headers: { token: localStorage.getItem("token") },
      });
      fetchLaptops();
      alert("Laptop added successfully!");
      navigate('/admin');
      setLaptop({ brand: "", model: "", serialNumber: "", purchaseDate: "" });
    } catch (error) {
      console.error("Error adding laptop:", error);
      alert("Failed to add laptop. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Add Laptop</h1>
      <form onSubmit={handleSubmit} className="form">
        {["brand", "model", "serialNumber", "purchaseDate"].map((field) => (
          <input
            key={field}
            type={field === "purchaseDate" ? "date" : "text"}
            name={field}
            value={laptop[field]}
            onChange={handleChange}
            placeholder={`Enter ${field}`}
            className="input"
            required
          />
        ))}
        <button type="submit" className="button">
          Add Laptop
        </button>
      </form>
    </div>
  );
};

export default AddLaptop;