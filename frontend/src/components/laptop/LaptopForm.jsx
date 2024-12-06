import React from "react";
import './LaptopForm.css'; // Import the CSS file

const LaptopForm = ({ formData, setFormData, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="form-container">
      {["brand", "model", "serialNumber", "purchaseDate"].map((field) => (
        <input
          key={field}
          type={field === "purchaseDate" ? "date" : "text"}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={(e) =>
            setFormData({ ...formData, [field]: e.target.value })
          }
          className="input-field"
          required
        />
      ))}
      <button type="submit" className="button">
        Add Laptop
      </button>
    </form>
  );
};

export default LaptopForm;