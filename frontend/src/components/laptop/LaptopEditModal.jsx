import React from "react";
import './laptopEditModel.css'; // Import the CSS file

const LaptopEditModal = ({ laptop, onClose, onSave, setLaptop }) => {
  if (!laptop) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLaptop({ ...laptop, [name]: value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Edit Laptop</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
          className="grid gap-4"
        >
          {["brand", "model", "serialNumber", "status"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={laptop[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              className="input-field"
              required
            />
          ))}
          <div className="button-container">
            <button
              type="button"
              onClick={onClose}
              className="button button-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button button-save"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LaptopEditModal;