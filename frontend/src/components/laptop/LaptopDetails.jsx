import axios from "axios";
import React from "react";
import './LaptopDetails.css'; // Import the CSS file

const LaptopDetails = ({ laptop, fetchAssignedLaptop }) => {
  
  if (!laptop) {
    return <p>No laptop assigned yet.</p>;
  }

  const handleUnAssigned = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/assignments/${id}`,
      { headers: { token: localStorage.getItem("token") } }
    );
    fetchAssignedLaptop();
  };

  return (
    <div className="container">
      <div className="laptop-info">
        {laptop.map((laptops) => (
          <div key={laptops._id} className="laptop-item">
            <p>
              <span className="laptop-label">Brand:</span> {laptops.laptopId.brand}
            </p>
            <p>
              <span className="laptop-label">Model:</span> {laptops.laptopId.model}
            </p>
            <p>
              <span className="laptop-label">Serial Number:</span> {laptops.laptopId.serialNumber}
            </p>
            <p>
              <span className="laptop-label">Condition:</span> {laptops.laptopId.status}
            </p>
            <button
              className="button"
              onClick={() => handleUnAssigned(laptops._id)}
            >
              Un-Assigned
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaptopDetails;